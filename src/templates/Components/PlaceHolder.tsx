export default function Placeholder(props: { isMobileHidden?: boolean }) {
  return (
    <div
      data-type="placeholder__image__container"
      className={`relative aspect-square min-w-48 min-h-48 sm:min-w-auto rounded-sm overflow-hidden ${
        props.isMobileHidden ? "hidden xl:block" : ""
      }`}
    >
      <a data-type="placeholder__image">
        <div
          data-type="placeholder__image__loader"
          className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
        ></div>
      </a>
      <button
        data-type="image__fav"
        className="hidden absolute right-2 top-2 w-8 h-8 cursor-pointer"
      >
        <div className="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-outline-rounded w-full h-full"></div>
      </button>
      <button
        data-type="image__unfav"
        className="hidden absolute right-2 top-2 w-8 h-8 cursor-pointer"
      >
        <div className="text-[#faebeb] hover:text-orange-500 transition-colors material-symbols--favorite-rounded w-full h-full"></div>
      </button>
    </div>
  );
}
