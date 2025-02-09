async function __tmp_loadVideos() {
  const container = document.getElementById("videos_videos");

  let config = await get("/data/config.json");
  let videos = await get("/data/videos.json");

  const start = getOffset();
  const end = getOffset() + getVideosPerPage();

  const url = new URL(window.location.toString());

  if (start < 0) {
    url.searchParams.set("offset", 0);
    window.location.href = url.href;
  } else if (end > videos.length) {
    url.searchParams.set("offset", videos.length - getVideosPerPage());
    window.location.href = url.href;
  }

  videos.slice(start, end).forEach((video, idx) => {
    container.appendChild(PlaceholderVid());
    let videos = document.querySelectorAll('[data-type="placeholder__video"]');
    setTimeout(() => {
      renderVideo(
        config.endpoint,
        config.bucket,
        config.prefix,
        video,
        videos[idx]
      );
    }, 250);
  });
}

window.onload = () => {
  enableNav();
  __tmp_loadVideos();
};
