function Placeholder() {
  const placeholderRoot = document.createElement("div");
  placeholderRoot.dataset.type = "placeholder__image__container";
  placeholderRoot.className =
    "relative aspect-square min-w-48 min-h-48 w-full h-full rounded-sm overflow-hidden ";

  const placeholderImage = document.createElement("a");
  placeholderImage.dataset.type = "placeholder__image";

  const placeholderImageLoader = document.createElement("div");
  placeholderImageLoader.dataset.type = "placeholder__image__loader";
  placeholderImageLoader.className =
    "w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]";

  const favoriteButton = document.createElement("button");
  favoriteButton.dataset.type = "image__fav";
  favoriteButton.className =
    "hidden absolute right-2 top-2 w-8 h-8 cursor-pointer";
  favoriteButton.innerHTML =
    '<div class="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-outline-rounded w-full h-full"></div>';
  const unfavoriteButton = document.createElement("button");
  unfavoriteButton.dataset.type = "image__unfav";
  unfavoriteButton.className =
    "hidden absolute right-2 top-2 w-8 h-8 cursor-pointer";
  unfavoriteButton.innerHTML =
    '<div class="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-rounded w-full h-full"></div>';

  placeholderImage.appendChild(placeholderImageLoader);
  placeholderRoot.appendChild(placeholderImage);
  placeholderRoot.appendChild(favoriteButton);
  placeholderRoot.appendChild(unfavoriteButton);

  return placeholderRoot;
}

function PlaceholderVid() {
  const placeholderRoot = document.createElement("div");
  placeholderRoot.dataset.type = "placeholder__video__container";
  placeholderRoot.className =
    "relative aspect-square min-w-48 min-h-48 w-full h-full rounded-sm overflow-hidden ";

  const placeholderVid = document.createElement("video");
  placeholderVid.dataset.type = "placeholder__video";
  placeholderVid.className =
    "w-full h-full absolute inset-0 aspect-square rounded-sm [&:not(:fullscreen)]:object-cover";
  placeholderVid.controls = true;

  const placeholderVidLoader = document.createElement("div");
  placeholderVidLoader.dataset.type = "placeholder__video__loader";
  placeholderVidLoader.className =
    "w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]";

  const placeholderSrc = document.createElement("source");

  const favoriteButton = document.createElement("button");
  favoriteButton.dataset.type = "video__fav";
  favoriteButton.className =
    "hidden absolute right-2 top-2 w-8 h-8 cursor-pointer";
  favoriteButton.innerHTML =
    '<div class="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-outline-rounded w-full h-full"></div>';
  const unfavoriteButton = document.createElement("button");
  unfavoriteButton.dataset.type = "video__unfav";
  unfavoriteButton.className =
    "hidden absolute right-2 top-2 w-8 h-8 cursor-pointer";
  unfavoriteButton.innerHTML =
    '<div class="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-rounded w-full h-full"></div>';


  placeholderVid.appendChild(placeholderVidLoader);
  placeholderVid.appendChild(placeholderSrc);
  placeholderRoot.appendChild(placeholderVid);
  placeholderRoot.appendChild(favoriteButton);
  placeholderRoot.appendChild(unfavoriteButton);
  return placeholderRoot;
}

function AllLink(href, title) {
  const link = document.createElement("a");
  link.href = href;
  link.className =
    "text-[#f9ebeb] hover:bg-orange-600 rounded-sm overflow-hidden transition-colors aspect-square bg-yellow-950 min-w-48 sm:min-w-auto flex items-center justify-center flex-col";
  link.innerHTML = `
    <span class="material-symbols--arrow-forward-rounded w-16 h-16"></span>
    <p class="text-xl">${title}</p>`;
  return link;
}
