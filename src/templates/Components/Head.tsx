export default function head(props: {
  title: string;
  description: string;
  image: string;
  path: string;
  url: string;
  environment: "prod" | "dev";
  preload?: string[];
  dns?: string[];
  script?: string[];
}) {
  const mimetype = `image/${
    props.image.split(".")[props.image.split(".").length - 1]
  }`;

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{props.title}</title>
      <link rel="icon" type="image/ico" href="/favicon.ico" />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${props.url}${props.path}`} />
      <meta property="og:image" content={props.image} />
      <meta property="og:image:type" content={mimetype} />
      <meta property="og:image:alt" content="" />
      <meta property="og:logo" content={`${props.url}/static/logo-1x.png`} />
      <link
        href={
          props.environment == "dev"
            ? "/static/tailwind.css"
            : "/static/tailwind.min.css"
        }
        rel="stylesheet"
      />
      {props.preload
        ? props.preload.map((item) =>
            item ? (
              <link
                key={`preload_${item}`}
                rel="preload"
                href={item}
                as="fetch"
                crossOrigin="anonymous"
              ></link>
            ) : (
              ""
            )
          )
        : ""}
      {props.dns
        ? props.dns.map((item) =>
            item ? (
              <link key={`dns_${item}`} rel="dns-prefetch" href={item} />
            ) : (
              ""
            )
          )
        : ""}
      {props.script
        ? props.script.map((item) =>
            item ? <script key={`script_${item}`} src={item}></script> : ""
          )
        : ""}
    </head>
  );
}
