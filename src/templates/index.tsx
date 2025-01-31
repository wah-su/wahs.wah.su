import AllLink from "./Components/AllLink";
import Placeholder from "./Components/PlaceHolder";

export default function IndexPage() {
  return (
    <div>
      <p className="text-4xl bg-orange-800/50 rounded-sm p-4">Images</p>
      <div
        id="index_images"
        className="mt-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-4"
      >
        {[1, 2, 3, 4, 5, 6, 7].map((idx) => {
          return <Placeholder key={`placeholder__image-${idx}`} idx={idx} isMobileHidden={idx > 5} />;
        })}
        <AllLink location="/images/" text="View All Images" />
      </div>
    </div>
  );
}
