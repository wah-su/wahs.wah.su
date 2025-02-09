import PageNav from "./Components/PageNavigation";

export default function FavoritesPage() {
  return (
    <>
      <PageNav path="/images"/>
      <div
        id="favorites_favorites"
        className="my-2 overflow-hidden grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-2"
      ></div>
      <PageNav path="/images"/>
    </>
  );
}
