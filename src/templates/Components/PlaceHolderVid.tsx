export default function PlaceholderVid(props: { isMobileHidden?: boolean }) {
  return (
    <video
      data-type="placeholder__video"
      controls={true}
      className={`relative aspect-square w-full h-full max-w-48 max-h-48 sm:max-w-none sm:max-h-none rounded-sm [&:not(:fullscreen)]:object-cover ${
        props.isMobileHidden ? "hidden xl:block" : ""
      }`}
    >
      <div
        data-type="placeholder__video__loader"
        className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
      ></div>
      <source className={`${props.isMobileHidden ? "hidden xl:block" : ""}`}></source>
    </video>
  );
}
