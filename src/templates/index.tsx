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
        <Header path={props.path}/>
        <div className="container mx-auto">
            <div>
                <p>Images</p>
                <div id="index_images" className="flex flex-wrap gap-4"></div>
            </div>
        </div>
      <script src="./static/populate_index.js"></script>
      </body>
    </html>
  );
}
