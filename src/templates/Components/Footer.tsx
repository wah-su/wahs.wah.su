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
                className="object-contain w-8 rounded-full aspect-square"
                src="/static/github-mark-white.png"
                alt="github"
              />
            </a>
            <a href="https://wah.su">
              <img
                className="object-contain w-8 rounded-full aspect-square"
                src="/static/captive_portal_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
                alt="website"
              />
            </a>
          </div>
        </div>
    </div>
  );
}
