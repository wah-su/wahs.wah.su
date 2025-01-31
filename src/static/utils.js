async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await res.json();
}

function getAspect(image) {
  return Number(image.naturalWidth / image.naturalHeight);
}

function renderImage(endpoint, bucket, prefix, isrc, iid, placeholder) {
  const src = `${endpoint}/${bucket}/${prefix}/${isrc}`;
  const loader = placeholder.querySelector(
    '[data-type="placeholder__image__loader"]'
  );
  const blurImg = document.createElement("img");
  const Img = document.createElement("img");
  blurImg.src = `https://wsrv.nl/?url=${encodeURI(src)}&w=16&h=16`;
  blurImg.className = "object-cover w-full h-full absolute inset-0";
  blurImg.loading = "lazy";
  Img.src = `https://wsrv.nl/?url=${encodeURI(src)}&w=256&h=256`;
  Img.srcset = `https://wsrv.nl/?url=${encodeURI(
    src
  )}&w=256&h=256 256w, https://wsrv.nl/?url=${encodeURI(src)}&w=512&h=512 512w`;
  Img.sizes = `(max-width: 600px) 256px, 512px`;
  Img.className = "invisible object-cover w-full h-full absolute inset-0";
  Img.loading = "lazy";

  const view = getView();
  const container = document.getElementById("images_images");

  placeholder.appendChild(blurImg);
  placeholder.appendChild(Img);

  if (view == "masonry" && ["/images", "/images/", "/images/index.html"].includes(window.location.pathname)) {
    container.classList.remove(
      "xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
    );
    container.classList.add("xl:grid-cols-[repeat(6,minmax(180px,1fr))]");
    container.classList.add("xl:[grid-auto-flow:_row_dense]");

    blurImg.addEventListener("load", () => {
      const aspect = getAspect(blurImg);

      if (aspect < 0.95) {
        placeholder.classList.remove("aspect-square");
        placeholder.classList.add("aspect-[1/2]");
        placeholder.classList.add("w-full");
        placeholder.classList.add("h-full");
        Img.classList.add("object-cover");
        blurImg.classList.add("object-cover");
        placeholder.classList.add("[grid-row:span_2]");
      } else if (aspect > 1.05) {
        placeholder.classList.remove("aspect-square");
        placeholder.classList.add("aspect-[2/1]");
        placeholder.classList.add("w-full");
        placeholder.classList.add("h-full");
        Img.classList.add("object-cover");
        blurImg.classList.add("object-cover");
        placeholder.classList.add("[grid-column:span_2]");
      }

      blurImg.removeEventListener("load", this);
    });
  }

  Img.addEventListener("load", () => {
    Img.classList.remove("invisible");
    if (view == "grid") blurImg.remove();
    loader.remove();
    placeholder.href = `/image/?id=${iid}`;
    Img.removeEventListener("load", this);
  });
}

function setView(view) {
  localStorage.setItem("view", view);
}
function getView() {
  let view = localStorage.getItem("view");
  if (!view || !["grid", "masonry"].includes(view)) {
    setView("grid");
    view = "grid";
  }
  const active = document.querySelectorAll(`[data-view="${view}"]`);
  if (active.length > 0) {
    active.forEach((item) => {
      item.classList.add("text-orange-500");
    });
  }
  return view;
}

function setImagesPerPage(count) {
  localStorage.setItem("ImagesPP", count);
}
function getImagesPerPage() {
  let count = localStorage.getItem("ImagesPP");
  const url = new URL(window.location.toString());
  const countParam = url.searchParams.get("ImagesPP");

  if (!count && !countParam) {
    setImagesPerPage(24);
    url.searchParams.set("ImagesPP", 24);
    count = Number(24);
  } else if (countParam) {
    count = Number(countParam);
  } else if (count) {
    url.searchParams.set("ImagesPP", count);
    window.history.pushState(
      "",
      `Wah-Collection/Images`,
      `?${url.searchParams.toString()}`
    );
    count = Number(count);
  } else {
    count = 24;
  }

  const active = document.querySelectorAll(`[data-ipp="${count}"]`);
  if (active.length > 0) {
    active.forEach((item) => {
      item.classList.add("underline");
      item.classList.add("text-orange-500");
      item.classList.add("font-bold");
    });
  }
  return count;
}

function setOffset(offset) {
  const url = new URL(window.location.toString());
  url.searchParams.set("offset", offset);
  window.location.href = url.href;
}

function getOffset() {
  const url = new URL(window.location.toString());
  const offset = url.searchParams.get("offset");
  if (!offset) {
    return 0;
  }
  return Number(offset);
}

function enableNav() {
  function handleClickPrev() {
    setOffset(getOffset() - getImagesPerPage());
  }

  function handleClickNext() {
    setOffset(getOffset() + getImagesPerPage());
  }

  function handleClickIpp(ipp) {
    setImagesPerPage(ipp);
    const url = new URL(window.location.toString());
    url.searchParams.set("ImagesPP", ipp);
    window.location.href = url.href;
  }

  function handleClickView(view) {
    setView(view);
    window.location.reload();
  }

  const nav_prev = document.querySelectorAll("#nav_prev");
  const nav_next = document.querySelectorAll("#nav_next");
  const nav_ipp = document.querySelectorAll("#nav_ipp");
  const nav_view = document.querySelectorAll("#nav_view");

  nav_prev.forEach((item) => {
    item.addEventListener("click", handleClickPrev);
  });
  nav_next.forEach((item) => {
    item.addEventListener("click", handleClickNext);
  });
  nav_ipp.forEach((item) => {
    item.addEventListener("click", () => handleClickIpp(item.dataset.ipp));
  });
  nav_view.forEach((item) => {
    item.addEventListener("click", () => handleClickView(item.dataset.view));
  });
}
