async function __tmp_loadFavs() {
  const container = document.getElementById("favorites_favorites");

  let config = await get("/data/config.json");
  let images = await get("/data/images.json");
  let videos = await get("/data/videos.json");
  let favs = getFavorites();

  const start = getOffset();
  const end = getOffset() + getImagesPerPage();

  if (favs.slice(start, end) <= 0) {
    container.innerHTML =
      '<p class="text-2xl mx-auto col-span-full">No Favorites Found!</p>';
  }

  favs.slice(start, end).forEach((item, idx) => {
    let pl;
    if (item.type == "image") {
      pl = container.appendChild(Placeholder());
      setTimeout(() => {
        renderImage(
          config.endpoint,
          config.bucket,
          config.prefix,
          images[item.iid],
          item.iid,
          pl
        );
      }, 250);
    } else {
      pl = container.appendChild(PlaceholderVid());
      setTimeout(() => {
        renderVideo(
          config.endpoint,
          config.bucket,
          config.prefix,
          videos[item.vid],
          item.vid,
          pl
        );
      }, 250);
    }
  });
}

window.onload = () => {
  enableNav();
  __tmp_loadFavs();
};
