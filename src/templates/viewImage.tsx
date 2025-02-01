import ImagePageNav from "./Components/ImagePageNavigation";

export default function ImagePage() {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <ImagePageNav />
      <div
        data-type="placeholder__image"
        className="relative w-full rounded-sm aspect-video overflow-hidden bg-black"
      >
        <div
          data-type="placeholder__image__loader"
          className="w-full h-full absolute inset-0 bg-gray-400/50 opacity-30 animate-pulse z-[3]"
        ></div>
      </div>
      <ImagePageNav />
    </div>
  );
}
