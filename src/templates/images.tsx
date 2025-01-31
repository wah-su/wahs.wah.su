import PageNav from "./Components/PageNavigation";

export default function ImagesPage() {
  return (
    <>
      <PageNav />
      <div
        id="images_images"
        className="my-4 overflow-hidden grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-4"
      ></div>
      <PageNav />
    </>
  );
}
