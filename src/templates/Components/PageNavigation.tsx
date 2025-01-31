export default function PageNav() {
  return (
    <div className="bg-orange-800/50 rounded-sm py-2 text-white flex justify-between gap-4 items-center">
      <button className="flex justify-center gap-4 items-center cursor-pointer" id="nav_prev">
        <div className="material-symbols--navigate-before w-16 h-16"></div>
      </button>
      <button className="flex justify-center gap-4 items-center cursor-pointer" id="nav_next">
        <div className="material-symbols--navigate-next w-16 h-16"></div>
      </button>
    </div>
  );
}
