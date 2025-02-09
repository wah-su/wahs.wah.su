export default function PageNav(props: { path: string }) {
  let ipp;
  if (props.path == "/images") {
    ipp = [12, 24, 32, 48, 72, 100, 250, 500, 1000];
  } else {
    ipp = [24, 48, 72, 100];
  }

  return (
    <div className="text-white dark:text-white bg-orange-800 dark:bg-orange-800/50 rounded-sm p-2 flex justify-between gap-4 items-center">
      <button
        className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
        id="nav_prev"
      >
        <div className="material-symbols--navigate-before w-14 h-14"></div>
      </button>
      <div className="flex gap-4">
        {ipp.map((item, idx) => {
          return (
            <button
              key={`ipp_${item}`}
              className={`${
                idx > 4 ? "hidden md:block" : ""
              } cursor-pointer md:text-lg lg:text-xl text-gray-200/75 hover:text-orange-500 transition-colors`}
              id="nav_ipp"
              data-ipp={item}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="flex">
        <div className="gap-1 hidden xl:flex">
          <button
            className="flex justify-center items-center cursor-pointer text-gray-200/75 hover:text-orange-500 transition-colors"
            id="nav_view"
            data-view="grid"
          >
            <div className="material-symbols--grid-on w-8 h-8"></div>
          </button>
          <button
            className="flex justify-center items-center cursor-pointer text-gray-200/75 hover:text-orange-500 transition-colors"
            id="nav_view"
            data-view="masonry"
          >
            <div className="material-symbols--dashboard-rounded w-8 h-8"></div>
          </button>
        </div>
        <button
          className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
          id="nav_next"
        >
          <div className="material-symbols--navigate-next w-14 h-14"></div>
        </button>
      </div>
    </div>
  );
}
