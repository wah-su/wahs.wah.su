function PlaceholderVid() {
  const placeholder = document.createElement("video");
  placeholder.dataset.type = "placeholder__video";
  placeholder.controls = true;
  placeholder.className =
    "relative aspect-square w-full h-full rounded-sm [&:not(:fullscreen)]:object-cover";

  const placeholder_loader = document.createElement("div");
  placeholder_loader.dataset.type = "placeholder__video__loader";
  placeholder_loader.className =
    "w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]";
  const placeholder_source = document.createElement("source");
  placeholder.appendChild(placeholder_loader);
  placeholder.appendChild(placeholder_source);

  return placeholder;
}

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
