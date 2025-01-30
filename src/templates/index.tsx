import Head from "./Components/Head";
import Header from "./Components/Header";

export default function Index(props: {
  environment: "prod" | "dev";
  title: string;
  path: string;
  head: {
    description: string;
    image: string;
    url: string;
    preload?: string[];
    dns?: string[];
  };
}) {
  return (
    <html>
      <Head
        environment={props.environment}
        title={props.title}
        path={props.path}
        {...props.head}
      />
      <body className="dark:bg-[#160606] text-[#f9ebeb]">
        <Header path={props.path} />
        <div className="container mx-auto py-4 px-4 sm:px-8">
          <div>
            <p className="text-4xl ">Images</p>
            <div
              id="index_images"
              className="mt-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-4"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => {
                return (
                  <a
                    data-type="index__placeholder__image"
                    key={`index__placeholder__image-${num}`}
                    className={`relative aspect-square min-w-48 sm:min-w-auto ${idx >= 5 ? "hidden xl:block" : ""}`}
                  >
                    <div id={`index__placeholder__image-${num}-loader`} className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"></div>
                  </a>
                );
              })}
              <a href="/images/" className="hover:bg-orange-600 transition-colors aspect-square dark:bg-yellow-950 min-w-48 sm:min-w-auto flex items-center justify-center flex-col">
                <span className="material-symbols--arrow-forward-rounded w-16 h-16"></span>
                <p className="text-xl">All Images</p>
              </a>
            </div>
          </div>
        </div>
        <script src="./static/populate_index.js"></script>
      </body>
    </html>
  );
}
