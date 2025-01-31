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
