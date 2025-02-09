import PageNav from "./Components/PageNavigation";

export default function VideosPage() {
  return (
    <>
      <PageNav path="/videos"/>
      <div
        id="videos_videos"
        className="my-2 overflow-hidden grid grid-cols-[100%] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-2"
      ></div>
      <PageNav path="/videos"/>
    </>
  );
}
