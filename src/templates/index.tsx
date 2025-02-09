import AllLink from "./Components/AllLink";
import Placeholder from "./Components/PlaceHolder";
import PlaceholderVid from "./Components/PlaceHolderVid";

export default function IndexPage() {
  return (
    <div>
      <p className="text-4xl text-white dark:text-white bg-orange-800 dark:bg-orange-800/50 rounded-sm p-4">Images</p>
      <div
        id="index_images"
        className="mt-2 mb-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-2"
      >
        {[...Array(7).keys()].map((idx) => {
          return (
            <Placeholder
              key={`placeholder__image-${idx}`}
              isMobileHidden={idx > 4}
            />
          );
        })}
        <AllLink location="/images/" text="View All Images" />
      </div>
      <p className="text-4xl text-white dark:text-white bg-orange-800 dark:bg-orange-800/50 rounded-sm p-4">Videos</p>
      <div
        id="index_videos"
        className="mt-2 mb-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-2"
      >
        {[...Array(3).keys()].map((idx) => {
          return (
            <PlaceholderVid
              key={`placeholder__video-${idx}`}
              isMobileHidden={idx > 1}
            />
          );
        })}
        <AllLink location="/videos/" text="View All Videos" />
      </div>
      <p className="text-4xl text-white dark:text-white bg-orange-800 dark:bg-orange-800/50 rounded-sm p-4">Favorites</p>
      <div
        id="index_favorites"
        className="mt-2 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-2"
      >
        <p className="text-2xl mx-auto col-span-full">You have not added any Favorites</p>
      </div>
    </div>
  );
}
