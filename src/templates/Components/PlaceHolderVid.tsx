export default function PlaceholderVid(props: { isMobileHidden?: boolean }) {
  return (
    <div
      data-type="placeholder__video__container"
      className={`relative aspect-square w-full h-full max-w-48 max-h-48 sm:max-w-none sm:max-h-none rounded-sm ${
        props.isMobileHidden ? "hidden xl:block" : ""
      }`}
    >
      <video
        data-type="placeholder__video"
        className={`w-full h-full absolute inset-0 [&:not(:fullscreen)]:object-cover ${
          props.isMobileHidden ? "hidden xl:block" : ""
        }`}
        controls={true}
      >
        <div
          data-type="placeholder__video__loader"
          className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
        ></div>
        <source
          className={`${props.isMobileHidden ? "hidden xl:block" : ""}`}
        ></source>
      </video>
      <button
        data-type="video__fav"
        className="hidden absolute right-2 top-2 w-8 h-8 cursor-pointer"
      >
        <div className="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-outline-rounded w-full h-full"></div>
      </button>
      <button
        data-type="video__unfav"
        className="hidden absolute right-2 top-2 w-8 h-8 cursor-pointer"
      >
        <div className="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-rounded w-full h-full"></div>
      </button>
    </div>
  );
}
