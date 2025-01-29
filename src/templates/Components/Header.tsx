export default function Header(props: {path: string}) {
  return (
    <header className="sticky top-0 left-0 right-0 dark:bg-orange-950 text-[#f9ebeb] rounded-b-lg z-10">
      <div className="container flex items-center justify-between gap-4 px-8 py-4 mx-auto min-h-16">
        <a href="/">
          <img
            className="h-6 sm:h-10"
            src="/static/logo.svg"
            alt="index page"
          />
        </a>
        <div className="flex items-center gap-4">
            <a href="/images/" className={`${props.path == "/images/" ? "underline" : ""} lg:text-xl`}>Images</a>
            <a href="/videos/" className={`${props.path == "/videos/" ? "underline" : ""} lg:text-xl`}>Videos</a>
        </div>
      </div>
    </header>
  );
}
