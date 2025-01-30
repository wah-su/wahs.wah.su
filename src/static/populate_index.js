async function get(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  return await res.json();
}

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

async function FetchData() {
  let images = await get("/data/images.json");
  // let videos = await get("/data/videos.json");

  const Images = document.querySelectorAll(
    '[data-type="index__placeholder__image"]'
  );
  const VisibleImages = [];
  Images.forEach((placeholder) => {
    if (placeholder.checkVisibility()) {
      VisibleImages.push(placeholder);
    }
  });

  randomElements(images, VisibleImages.length).forEach((image, idx) => {
    const loader = document.getElementById(
      `index__placeholder__image-${idx + 1}-loader`
    );
    const blurImg = document.createElement("img");
    const Img = document.createElement("img");
    blurImg.src = `https://wsrv.nl/?url=${encodeURI(image.src)}&w=16&h=16`;
    blurImg.className = "object-cover w-full h-full absolute inset-0";
    Img.src = `https://wsrv.nl/?url=${encodeURI(image.src)}&w=256&h=256`;
    Img.srcset = `https://wsrv.nl/?url=${encodeURI(
      image.src
    )}&w=256&h=256 256w, https://wsrv.nl/?url=${encodeURI(
      image.src
    )}&w=512&h=512 512w`;
    Img.sizes = `(max-width: 600px) 256px, 512px`;
    Img.className = "invisible object-cover w-full h-full absolute inset-0";

    VisibleImages[idx].appendChild(blurImg);
    VisibleImages[idx].appendChild(Img);

    Img.addEventListener("load", () => {
      Img.classList.remove("invisible");
      blurImg.remove();
      loader.remove();
      VisibleImages[idx].href = `/image/?id=${image.id}`;
      // VisibleImages[idx].href = `/image/?name=${encodeURI(image.split("/")[image.split("/").length - 1])}`;
      Img.removeEventListener("load", this);
    });
  });
}
window.onload = () => {
  FetchData();
};
