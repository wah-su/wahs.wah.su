export default function ImagePageNav() {
  return (
    <div className="text-white dark:text-white bg-orange-800 dark:bg-orange-800/50 rounded-sm p-2">
      <div className="flex gap-4 justify-between items-center">
        <button
          className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
          id="nav_prev"
        >
          <div className="material-symbols--navigate-before w-16 h-16"></div>
        </button>

        <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
            <div className="flex gap-4">
              <button
                className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
                id="fit_cover"
              >
                <div className="material-symbols--crop w-8 h-8"></div>
              </button>
              <button
                className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
                id="fit_contain"
              >
                <div className="material-symbols--fullscreen-exit w-8 h-8"></div>
              </button>
              <button
                className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
                id="fit_full"
              >
                <div className="material-symbols--open-in-full w-8 h-8"></div>
              </button>
            </div>
    
            <div className="flex gap-4">
              <button
                className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
                id="act_download"
              >
                <div className="material-symbols--download w-8 h-8"></div>
              </button>
              <button
                className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
                id="act_newtab"
              >
                <div className="material-symbols--open-in-new w-8 h-8"></div>
              </button>
            </div>
        </div>
        
        <button
          className="flex justify-center items-center cursor-pointer hover:text-orange-500 transition-colors"
          id="nav_next"
        >
          <div className="material-symbols--navigate-next w-16 h-16"></div>
        </button>
      </div>
    </div>
  );
}
