import AllLink from "./Components/AllLink";
export default function IndexPage() {
  return (
    <div>
      <p className="text-4xl bg-orange-800/50 rounded-sm p-4">Images</p>
      <div
        id="index_images"
        className="mt-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-4"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => {
          return (
            <a
              data-type="index__placeholder__image"
              key={`index__placeholder__image-${num}`}
              className={`relative aspect-square min-w-48 sm:min-w-auto rounded-sm overflow-hidden ${
                idx >= 5 ? "hidden xl:block" : ""
              }`}
            >
              <div
                id={`index__placeholder__image-${num}-loader`}
                className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
              ></div>
            </a>
          );
        })}
        <AllLink location="/images/" text="View All Images"/>
      </div>
    </div>
  );
}
