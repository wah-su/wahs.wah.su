async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await res.json();
}

function changeImgFit() {
  const fit = getFit();
  const image = document.querySelector("[data-hi]");

  const placeholder = document.querySelector(
    '[data-type="placeholder__image"]'
  );

  if (fit == "contain") {
    image.className = "w-full h-full object-contain";
    placeholder.classList.add("bg-black");
    placeholder.classList.add("aspect-video");
  }
  if (fit == "cover") {
    image.className = "w-full h-full object-cover";
    placeholder.classList.add("bg-black");
    placeholder.classList.add("aspect-video");
  }
  if (fit == "full") {
    image.className = "w-auto h-auto mx-auto";
    placeholder.classList.remove("bg-black");
    placeholder.classList.remove("aspect-video");
  }
}

function renderImage(endpoint, bucket, prefix, isrc, placeholder) {
  const src = `${endpoint}/${bucket}/${prefix}/${isrc}`;
  const loader = placeholder.querySelector(
    '[data-type="placeholder__image__loader"]'
  );
  const blurImg = document.createElement("img");
  const Img = document.createElement("img");
  blurImg.src = `https://wsrv.nl/?url=${encodeURI(src)}&w=16&h=16`;
  blurImg.className = "object-cover w-full h-full absolute inset-0";
  blurImg.alt = `Loading: ${isrc}`
  Img.dataset.hi = "fit";
  Img.src = `https://wsrv.nl/?url=${encodeURI(src)}`;
  Img.className = "invisible w-full h-full object-contain";
  Img.loading = "lazy";
  Img.alt = isrc

  placeholder.appendChild(blurImg);
  placeholder.appendChild(Img);

  Img.addEventListener("load", () => {
    changeImgFit();
    Img.classList.remove("invisible");
    blurImg.remove();
    loader.remove();
    Img.removeEventListener("load", this);
  });
}

async function _tmp_loadImage(iid) {
  const config = await get("/data/config.json");
  const images = await get("/data/images.json");

  if (iid < 0 || iid > images.length) {
    window.location.href = "/image/?id=0";
  }

  document.querySelector(
    "title"
  ).textContent = `WAH-Collection/Image: ${images[iid]}`;

  const image = images[iid];
  const placeholder = document.querySelector(
    '[data-type="placeholder__image"]'
  );
  renderImage(
    config.endpoint,
    config.bucket,
    config.prefix,
    image,
    placeholder
  );
}

function setFit(fit) {
  localStorage.setItem("fit", fit);
}
function getFit() {
  let fit = localStorage.getItem("fit");
  if (!fit || !["contain", "cover", "full"].includes(fit)) {
    setFit("contain");
    fit = "contain";
  }

  const FitContain = document.querySelectorAll("#fit_contain");
  const FitCover = document.querySelectorAll("#fit_cover");
  const FitFull = document.querySelectorAll("#fit_full");

  switch (fit) {
    case "contain": {
      FitContain.forEach((item) =>
        item.classList.add("text-orange-500", "font-bold")
      );
      FitCover.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      FitFull.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      break;
    }
    case "cover": {
      FitContain.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      FitCover.forEach((item) =>
        item.classList.add("text-orange-500", "font-bold")
      );
      FitFull.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      break;
    }
    case "full": {
      FitContain.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      FitCover.forEach((item) =>
        item.classList.remove("text-orange-500", "font-bold")
      );
      FitFull.forEach((item) =>
        item.classList.add("text-orange-500", "font-bold")
      );
      break;
    }
  }

  return fit;
}

function _tmp_loadNav(url, iid) {
  const prev = document.querySelectorAll("#nav_prev");
  const next = document.querySelectorAll("#nav_next");
  const fit = getFit();
  const FitContain = document.querySelectorAll("#fit_contain");
  const FitCover = document.querySelectorAll("#fit_cover");
  const FitFull = document.querySelectorAll("#fit_full");
  const download = document.querySelectorAll("#act_download");
  const newtab = document.querySelectorAll("#act_newtab");

  function handleClickPrev() {
    window.location.href = `/image/?id=${Number(iid) - 1}`;
  }
  function handleClickNext() {
    window.location.href = `/image/?id=${Number(iid) + 1}`;
  }
  function handleClickContain() {
    setFit("contain");
    changeImgFit();
  }
  function handleClickCover() {
    setFit("cover");
    changeImgFit();
  }
  function handleClickFull() {
    setFit("full");
    changeImgFit();
  }
  async function handleClickDownload() {
    const config = await get("/data/config.json");
    const images = await get("/data/images.json");
    const blob = await fetch(
      `https://wsrv.nl/?url=${config.endpoint}/${config.bucket}/${config.prefix}/${images[iid]}?encoding=base64`
    )
      .then((res) => res)
      .then((data) => data.blob());
    const fileURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileURL;
    downloadLink.download = images[iid];
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  }
  function handleClickNewTab() {
    const image = document.querySelector("[data-hi]");
    window.open(image.src, "_blank").focus();
  }
  prev.forEach((item) => {
    item.addEventListener("click", handleClickPrev);
  });
  next.forEach((item) => {
    item.addEventListener("click", handleClickNext);
  });
  FitContain.forEach((item) => {
    item.addEventListener("click", handleClickContain);
  });
  FitCover.forEach((item) => {
    item.addEventListener("click", handleClickCover);
  });
  FitFull.forEach((item) => {
    item.addEventListener("click", handleClickFull);
  });
  download.forEach((item) => {
    item.addEventListener("click", handleClickDownload);
  });
  newtab.forEach((item) => {
    item.addEventListener("click", handleClickNewTab);
  });
}

window.onload = () => {
  const u = new URL(window.location.href);
  const iid = u.searchParams.get("id");

  if (!iid) {
    window.location.href = "/images/";
  }
  _tmp_loadNav(u, iid);
  _tmp_loadImage(iid);
};
