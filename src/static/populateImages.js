function Placeholder() {
  const placeholder = document.createElement("a");
  placeholder.dataset.type = "placeholder__image";
  placeholder.className =
    "relative aspect-square min-w-48 sm:min-w-auto rounded-sm overflow-hidden";

  const placeholder_loader = document.createElement("div");
  placeholder_loader.dataset.type = "placeholder__image__loader";
  placeholder_loader.className =
    "w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]";

  placeholder.appendChild(placeholder_loader);

  return placeholder;
}

async function __tmp_loadImages() {
  const container = document.getElementById("images_images");

  let config = await get("/data/config.json");
  let images = await get("/data/images.json");

  const start = getOffset();
  const end = getOffset() + getImagesPerPage();

  const url = new URL(window.location.toString());

  if (start < 0) {
    url.searchParams.set("offset", 0);
    window.location.href = url.href;
  } else if (end > images.length) {
    url.searchParams.set("offset", images.length - getImagesPerPage());
    window.location.href = url.href;
  }

  images.slice(start, end).forEach((image, idx) => {
    container.appendChild(Placeholder());
    let Images = document.querySelectorAll('[data-type="placeholder__image"]');
    const iid = Number(start) + Number(idx);
    setTimeout(() => {
      renderImage(
        config.endpoint,
        config.bucket,
        config.prefix,
        image,
        iid,
        Images[idx]
      );
    }, 250);
  });
}

window.onload = () => {
  enableNav();
  __tmp_loadImages();
};
