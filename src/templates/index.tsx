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
      <body className="dark:bg-[#160606] bg-[#faebeb] dark:text-[#f9ebeb] text-[#140606]">
        <Header path={props.path} />
        <div className="container mx-auto py-4 px-4 sm:px-8">
          <div>
            <p className="text-4xl bg-orange-800/50 rounded-sm p-4">Images</p>
            <div
              id="index_images"
              className="mt-4 flex overflow-x-auto sm:overflow-x-hidden sm:grid sm:grid-cols-[repeat(auto-fill,minmax(25%,1fr))] xl:grid-cols-[repeat(auto-fill,minmax(20%,1fr))] sm:items-center sm:justify-center gap-4"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num, idx) => {
                return (
                  <a
                    data-type="index__placeholder__image"
                    key={`index__placeholder__image-${num}`}
                    className={`relative aspect-square min-w-48 sm:min-w-auto rounded-sm overflow-hidden ${
                      idx >= 5 ? "hidden xl:block" : ""
                    }`}
                  >
                    <div
                      id={`index__placeholder__image-${num}-loader`}
                      className="w-full h-full absolute inset-0 bg-gray-400 opacity-30 animate-pulse z-[3]"
                    ></div>
                  </a>
                );
              })}
              <a
                href="/images/"
                className="text-[#f9ebeb] hover:bg-orange-600 rounded-sm overflow-hidden transition-colors aspect-square bg-yellow-950 min-w-48 sm:min-w-auto flex items-center justify-center flex-col"
              >
                <span className="material-symbols--arrow-forward-rounded w-16 h-16"></span>
                <p className="text-xl">All Images</p>
              </a>
            </div>
          </div>
        </div>
        <script src={props.environment == "dev" ? "/static/populate_index.js" : "/static/populate_index.min.js"}></script>
      </body>
    </html>
  );
}
