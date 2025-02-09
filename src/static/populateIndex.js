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
  let videos = await get("/data/videos.json");

  let favs = getFavorites();

  const Images = document.querySelectorAll(
    '[data-type="placeholder__image__container"]'
  );
  const VisibleImages = [];
  Images.forEach((placeholder) => {
    if (placeholder.checkVisibility()) {
      VisibleImages.push(placeholder);
    }
  });

  const Videos = document.querySelectorAll(
    '[data-type="placeholder__video__container"]'
  );
  const VisibleVideos = [];
  Videos.forEach((placeholder) => {
    if (placeholder.checkVisibility()) {
      VisibleVideos.push(placeholder);
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

  randomElements(videos, VisibleVideos.length).forEach((video, idx) => {
    renderVideo(
      config.endpoint,
      config.bucket,
      config.prefix,
      video.src,
      video.id,
      VisibleVideos[idx]
    );
  });

  const FavoritesContainer = document.getElementById("index_favorites");
  if (favs.length > 0) {
    FavoritesContainer.innerHTML = "";
    favs.forEach((item, idx) => {
      if (idx >= 11) return;
      let pl;
      if (item.type == "image") {
        pl = FavoritesContainer.appendChild(Placeholder());
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
        pl = FavoritesContainer.appendChild(PlaceholderVid());
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
    if (favs.length >= 11) {
      FavoritesContainer.appendChild(
        AllLink("/favorites/", "View All Favorites")
      );
    }
  }
}
window.onload = () => {
  populateIndex();
};
