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
function getAspectVid(video) {
  return Number(video.videoWidth / video.videoHeight);
}

function renderImage(endpoint, bucket, prefix, isrc, iid, placeholderRoot) {
  const src = `${endpoint}/${bucket}/${prefix}/${isrc}`;
  const placeholderImage = placeholderRoot.querySelector(
    '[data-type="placeholder__image"]'
  );
  const placeholderImageLoader = placeholderImage.querySelector(
    '[data-type="placeholder__image__loader"]'
  );
  const favoriteButton = placeholderRoot.querySelector(
    '[data-type="image__fav"]'
  );
  const unfavoriteButton = placeholderRoot.querySelector(
    '[data-type="image__unfav"]'
  );

  const blurImg = document.createElement("img");
  const Img = document.createElement("img");
  blurImg.src = `https://wsrv.nl/?url=${encodeURI(src)}&w=16&h=16`;
  blurImg.className = "object-cover w-full h-full absolute inset-0";
  blurImg.loading = "lazy";
  blurImg.alt = `Loading: ${isrc}`;
  Img.src = `https://wsrv.nl/?url=${encodeURI(src)}&w=256&h=256`;
  Img.srcset = `https://wsrv.nl/?url=${encodeURI(
    src
  )}&w=256&h=256 256w, https://wsrv.nl/?url=${encodeURI(src)}&w=512&h=512 512w`;
  Img.sizes = `(max-width: 600px) 256px, 512px`;
  Img.className = "invisible object-cover w-full h-full absolute inset-0";
  Img.loading = "lazy";
  Img.alt = isrc;

  const isFav = getFavorites().find((el) => el.iid == iid) || false;
  favoriteButton.addEventListener("click", () => {
    addFavorites(iid, "image");
    favoriteButton.classList.add("hidden");
    unfavoriteButton.classList.remove("hidden");
  });
  unfavoriteButton.addEventListener("click", () => {
    removeFavorites(iid, "image");
    favoriteButton.classList.remove("hidden");
    unfavoriteButton.classList.add("hidden");
  });
  if (!isFav) {
    favoriteButton.classList.remove("hidden");
  } else {
    unfavoriteButton.classList.remove("hidden");
  }

  const view = getView();
  const container =
    document.getElementById("images_images") ||
    document.getElementById("favorites_favorites");

  placeholderImage.appendChild(blurImg);
  placeholderImage.appendChild(Img);

  if (
    view == "masonry" &&
    [
      "/images",
      "/images/",
      "/images/index.html",
      "/favorites",
      "/favorites/",
      "/favorites/index.html",
    ].includes(window.location.pathname)
  ) {
    container.classList.remove(
      "xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
    );
    container.classList.add("xl:grid-cols-[repeat(6,minmax(180px,1fr))]");
    container.classList.add("xl:[grid-auto-flow:_row_dense]");

    blurImg.addEventListener("load", () => {
      const aspect = getAspect(blurImg);

      if (aspect < 0.95) {
        placeholderRoot.classList.remove("aspect-square");
        placeholderRoot.classList.add("aspect-[1/2]");
        placeholderRoot.classList.add("w-full");
        placeholderRoot.classList.add("h-full");
        Img.classList.add("object-cover");
        blurImg.classList.add("object-cover");
        placeholderRoot.classList.add("[grid-row:span_2]");
      } else if (aspect > 1.05) {
        placeholderRoot.classList.remove("aspect-square");
        placeholderRoot.classList.add("aspect-[2/1]");
        placeholderRoot.classList.add("w-full");
        placeholderRoot.classList.add("h-full");
        Img.classList.add("object-cover");
        blurImg.classList.add("object-cover");
        placeholderRoot.classList.add("[grid-column:span_2]");
      }

      blurImg.removeEventListener("load", this);
    });
  }

  Img.addEventListener("load", () => {
    Img.classList.remove("invisible");
    blurImg.remove();
    placeholderImageLoader.remove();
    placeholderImage.href = `/image/?id=${iid}`;
    Img.removeEventListener("load", this);
  });
}

function renderVideo(endpoint, bucket, prefix, vsrc, vid, placeholderRoot) {
  const placeholderVid = placeholderRoot.querySelector(
    '[data-type="placeholder__video"]'
  );
  const placeholderVidLoader = placeholderVid.querySelector(
    '[data-type="placeholder__video__loader"]'
  );
  const favoriteButton = placeholderRoot.querySelector(
    '[data-type="video__fav"]'
  );
  const unfavoriteButton = placeholderRoot.querySelector(
    '[data-type="video__unfav"]'
  );

  const view = getView();
  const container =
    document.getElementById("videos_videos") ||
    document.getElementById("favorites_favorites");

  const source = placeholderVid.querySelector("source");
  const ext = vsrc.split(".")[vsrc.split(".").length - 1];
  placeholderVid.src = `${endpoint}/${bucket}/${prefix}/${vsrc}`;
  placeholderVid.preload = "metadata";
  source.src = `${endpoint}/${bucket}/${prefix}/${vsrc}`;
  source.type = `video/${ext}`;

  const isFav = getFavorites().find((el) => el.vid == vid) || false;
  favoriteButton.addEventListener("click", () => {
    addFavorites(vid, "video");
    favoriteButton.classList.add("hidden");
    unfavoriteButton.classList.remove("hidden");
  });
  unfavoriteButton.addEventListener("click", () => {
    removeFavorites(vid, "video");
    favoriteButton.classList.remove("hidden");
    unfavoriteButton.classList.add("hidden");
  });
  if (!isFav) {
    favoriteButton.classList.remove("hidden");
  } else {
    unfavoriteButton.classList.remove("hidden");
  }

  if (
    view == "masonry" &&
    [
      "/videos",
      "/videos/",
      "/videos/index.html",
      "/favorites",
      "/favorites/",
      "/favorites/index.html",
    ].includes(window.location.pathname)
  ) {
    container.classList.remove(
      "xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))]"
    );
    container.classList.add("xl:grid-cols-[repeat(6,minmax(180px,1fr))]");
    container.classList.add("xl:[grid-auto-flow:_row_dense]");

    placeholderVid.addEventListener("loadedmetadata", () => {
      const aspect = getAspectVid(placeholderVid);

      if (aspect < 0.95) {
        placeholderVid.classList.remove("aspect-square");
        placeholderRoot.classList.remove("aspect-square");
        placeholderVid.classList.add("aspect-[1/2]");
        placeholderRoot.classList.add("aspect-[1/2]");
        placeholderVid.classList.add("w-full");
        placeholderRoot.classList.add("w-full");
        placeholderVid.classList.add("h-full");
        placeholderRoot.classList.add("h-full");
        placeholderVid.classList.add("[grid-row:span_2]");
        placeholderRoot.classList.add("[grid-row:span_2]");
      } else if (aspect > 1.05) {
        placeholderVid.classList.remove("aspect-square");
        placeholderRoot.classList.remove("aspect-square");
        placeholderVid.classList.add("aspect-[2/1]");
        placeholderRoot.classList.add("aspect-[2/1]");
        placeholderVid.classList.add("w-full");
        placeholderRoot.classList.add("w-full");
        placeholderVid.classList.add("h-full");
        placeholderRoot.classList.add("h-full");
        placeholderVid.classList.add("[grid-column:span_2]");
        placeholderRoot.classList.add("[grid-column:span_2]");
      }

      placeholderVid.removeEventListener("loadedmetadata", this);
    });
  }
}

function getFavorites() {
  const favs = localStorage.getItem("favorites");
  if (!favs) {
    setFavorites([]);
    return [];
  }
  return JSON.parse(favs);
}

function setFavorites(favs) {
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function addFavorites(iid, type) {
  const favs = getFavorites();
  let newFav;
  if (type == "image") {
    newFav = {
      iid,
      type,
    };
  } else {
    newFav = {
      vid: iid,
      type,
    };
  }

  const newFavs = [...favs, newFav];
  setFavorites(newFavs);
}

function removeFavorites(iid, type) {
  let idx;
  if (type == "image") {
    idx = getFavorites().findIndex((el) => el.iid == iid);
  } else {
    idx = getFavorites().findIndex((el) => el.vid == iid);
  }
  const favs = getFavorites();
  if (idx > -1) {
    favs.splice(idx, 1);
    setFavorites(favs);
  }
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
      item.classList.add("text-orange-400");
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
      item.classList.add("text-orange-400");
      item.classList.add("font-bold");
    });
  }
  return count;
}

function setVideosPerPage(count) {
  localStorage.setItem("VideosPP", count);
}
function getVideosPerPage() {
  let count = localStorage.getItem("VideosPP");
  const url = new URL(window.location.toString());
  const countParam = url.searchParams.get("VideosPP");

  if (!count && !countParam) {
    setVideosPerPage(24);
    url.searchParams.set("VideosPP", 24);
    count = Number(24);
  } else if (countParam) {
    count = Number(countParam);
  } else if (count) {
    url.searchParams.set("VideosPP", count);
    window.history.pushState(
      "",
      `Wah-Collection/Videos`,
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
      item.classList.add("text-orange-400");
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
    if (
      [
        "/images",
        "/images/",
        "/images/index.html",
        "/favorites",
        "/favorites/",
        "/favorites/index.html",
      ].includes(window.location.pathname)
    ) {
      setOffset(getOffset() - getImagesPerPage());
    } else if (
      ["/videos", "/videos/", "/videos/index.html"].includes(
        window.location.pathname
      )
    ) {
      setOffset(getOffset() - getVideosPerPage());
    }
  }

  function handleClickNext() {
    if (
      [
        "/images",
        "/images/",
        "/images/index.html",
        "/favorites",
        "/favorites/",
        "/favorites/index.html",
      ].includes(window.location.pathname)
    ) {
      setOffset(getOffset() + getImagesPerPage());
    } else if (
      ["/videos", "/videos/", "/videos/index.html"].includes(
        window.location.pathname
      )
    ) {
      setOffset(getOffset() + getVideosPerPage());
    }
  }

  function handleClickIpp(ipp) {
    const url = new URL(window.location.toString());

    if (
      [
        "/images",
        "/images/",
        "/images/index.html",
        "/favorites",
        "/favorites/",
        "/favorites/index.html",
      ].includes(window.location.pathname)
    ) {
      setImagesPerPage(ipp);
      url.searchParams.set("ImagesPP", ipp);
    } else if (
      ["/videos", "/videos/", "/videos/index.html"].includes(
        window.location.pathname
      )
    ) {
      setVideosPerPage(ipp);
      url.searchParams.set("VideosPP", ipp);
    }
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
