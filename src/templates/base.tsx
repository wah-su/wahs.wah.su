import Head from "./Components/Head";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export default function Index(props: {
  children: any;
  environment: "prod" | "dev";
  title: string;
  path: string;
  head: {
    description: string;
    image: string;
    url: string;
    preload?: string[];
    dns?: string[];
    script?: string[];
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
          {props.children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
