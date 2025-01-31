export default function PageNav() {

  const ipp = [12,24,32,48,72,100,250,500,1000]

  return (
    <div className="bg-orange-800/50 rounded-sm p-2 text-white flex justify-between gap-4 items-center">
      <button className="flex justify-center items-center cursor-pointer" id="nav_prev">
        <div className="material-symbols--navigate-before w-16 h-16"></div>
      </button>
      <div className="flex gap-4">
        {ipp.map((item, idx) => {
            return <button key={`ipp_${item}`}
            className={`${idx > 4 ? "hidden md:block" : ""} cursor-pointer md:text-lg lg:text-xl`}
            id="nav_ipp"
            data-ipp={item}
            >{item}</button>
        })}
      </div>
      <button className="flex justify-center items-center cursor-pointer" id="nav_next">
        <div className="material-symbols--navigate-next w-16 h-16"></div>
      </button>
    </div>
  );
}
