export default function Footer() {
  return (
    <div className="container mx-auto px-4 sm:px-8 mb-4">
        <div className="flex flex-wrap items-center gap-4 mx-auto">
          <a
            className="flex items-center gap-2 text-lg"
            href="https://wah.su/radiquum"
          >
            <span>by @radiquum</span>{" "}
            <img
              className="object-contain w-8 rounded-full aspect-square"
              src="https://radiquum.wah.su/static/avatar_512.jpg"
              alt=""
            />
          </a>
          <div className="flex items-center gap-2">
            <p className="text-lg">Find us on:</p>
            <a href="https://github.com/wah-su">
              <img
                className="object-contain w-8 rounded-full aspect-square block dark:hidden"
                src="/static/github-mark.png"
                alt="github"
              />
              <img
                className="object-contain w-8 rounded-full aspect-square hidden dark:block"
                src="/static/github-mark-white.png"
                alt="github"
              />
            </a>
            <a href="https://wah.su" className="flex items-center justify-center">
              <div className="material-symbols--globe w-8 h-8 dark:text-white text-slate-700"></div>
            </a>
          </div>
        </div>
    </div>
  );
}
