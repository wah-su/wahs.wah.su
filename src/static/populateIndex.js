function randomElements(src, count) {
  let result = [];
  const max = src.length - 1;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * max);
    result.push({
      src: src[idx],
      id: idx,
    });
  }
  return result;
}

async function populateIndex() {
  let config = await get("/data/config.json");
  let images = await get("/data/images.json");
  // let videos = await get("/data/videos.json");

  const Images = document.querySelectorAll('[data-type="placeholder__image"]');
  const VisibleImages = [];
  Images.forEach((placeholder) => {
    if (placeholder.checkVisibility()) {
      VisibleImages.push(placeholder);
    }
  });

  randomElements(images, VisibleImages.length).forEach((image, idx) => {
    renderImage(
      config.endpoint,
      config.bucket,
      config.prefix,
      image.src,
      image.id,
      VisibleImages[idx]
    );
  });
}
window.onload = () => {
  populateIndex();
};
