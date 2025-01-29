export default function head(props: {
  title: string;
  description: string;
  image: string;
  path: string;
  url: string;
  environment: "prod" | "dev";
  preload?: string[];
  dns?: string[];
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
      <meta property="og:image" content={props.image} />
      <meta property="og:image:type" content={mimetype} />
      <meta property="og:image:alt" content="" />
      <link href="/static/tailwind.css" rel="stylesheet" />
      <meta property="og:url" content={`${props.url}${props.path}`} />
      {props.preload ? props.preload.map((item) => <link key={`preload_${item}`} rel="preload" href={item} as="fetch"></link>) : ""}
      {props.dns ? props.dns.map((item) => <link key={`dns_${item}`} rel="dns-prefetch" href={item} />) : ""}
      {/* <meta property="og:logo" content="<%- baseUrl %><%= path %>/static/images/logo-1x.png" /> */}
      {props.environment == "dev" ? (
        <script src="./static/dev/hotreload.js"></script>
      ) : (
        ""
      )}
      {/* <script src="./static/functions.js"></script> */}
    </head>
  );
}
