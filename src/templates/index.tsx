import Head from "./Components/Head";
export default function Index(props: {
  environment: "prod" | "dev";
  title: string;
  head: {
    description: string;
    image: string;
    path: string;
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
        {...props.head}
      />
      <body>
        nothing yet . . .
      </body>
    </html>
  );
}
