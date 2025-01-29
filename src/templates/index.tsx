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
        nothing yet . . .
      </body>
    </html>
  );
}
