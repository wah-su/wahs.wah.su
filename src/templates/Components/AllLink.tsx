export default function AllLink(props: { location: string; text: string }) {
  return (
    <a
      href={props.location}
      className="text-[#f9ebeb] hover:bg-orange-600 rounded-sm overflow-hidden transition-colors aspect-square bg-yellow-950 min-w-48 sm:min-w-auto flex items-center justify-center flex-col"
    >
      <span className="material-symbols--arrow-forward-rounded w-16 h-16"></span>
      <p className="text-xl">{props.text}</p>
    </a>
  );
}
