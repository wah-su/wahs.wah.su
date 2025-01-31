async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await res.json();
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

  placeholder.appendChild(blurImg);
  placeholder.appendChild(Img);

  Img.addEventListener("load", () => {
    Img.classList.remove("invisible");
    blurImg.remove();
    loader.remove();
    placeholder.href = `/image/?id=${iid}`;
    Img.removeEventListener("load", this);
  });
}

function setImagesPerPage(count) {
  localStorage.setItem("ImagesPP", count);
}
function getImagesPerPage() {
  const count = localStorage.getItem("ImagesPP");
  const url = new URL(window.location.toString());
  const countParam = url.searchParams.get("ImagesPP");

  if (!count && !countParam) {
    setImagesPerPage(24);
    url.searchParams.set("ImagesPP", 24);
    return Number(24);
  } else if (countParam) {
    return Number(countParam);
  } else if (count) {
    url.searchParams.set("ImagesPP", count);
    window.history.pushState(
      { offset: getOffset(), ImagesPP: count },
      `Wah-Collection/Images`,
      `?${url.searchParams.toString()}`
    );
    return Number(count);
  } else {
    return 24;
  }
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
    setOffset(getOffset() - getImagesPerPage())
  }

  function handleClickNext() {
    setOffset(getOffset() + getImagesPerPage())
  }

  const nav_prev = document.querySelectorAll("#nav_prev")
  const nav_next = document.querySelectorAll("#nav_next")

  nav_prev.forEach((item) => {
    item.addEventListener('click', handleClickPrev)
  })
  nav_next.forEach((item) => {
    item.addEventListener('click', handleClickNext)
  })

}