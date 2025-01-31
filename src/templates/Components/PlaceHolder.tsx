export default function Placeholder(props: {
  idx: string | number;
  isMobileHidden?: boolean;
}) {
  return (
    <a
      data-type="placeholder__image"
      className={`relative aspect-square min-w-48 sm:min-w-auto rounded-sm overflow-hidden ${
        props.isMobileHidden ? "hidden xl:block" : ""
      }`}
    >
      <div
        id={`placeholder__image-${props.idx}-loader`}
        className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
      ></div>
    </a>
  );
}
