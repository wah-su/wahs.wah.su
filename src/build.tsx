import { Log } from "./utils";

const environment: "prod" | "dev" =
  (process.env.ENVIRONMENT as "prod" | "dev") || "prod";
const log = new Log();

if (environment == "dev") {
  log.warn("Running in a dev mode!");
}

if (!fs.existsSync("out")) fs.mkdirSync("out");

// List Objects from S3 bucket

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const S3 = new S3Client({
  region: "auto",
  endpoint: `${process.env.ENDPOINT}`,
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY}`,
  },
});

let images: string[] = [];
let videos: string[] = [];

async function listAllObjects(bucketName: string, prefix: string) {
  let isTruncated: boolean = true;
  let continuationToken: string = "";

  while (isTruncated) {
    const params = {
      Bucket: bucketName,
      Prefix: prefix,
      ContinuationToken: continuationToken,
    };

    const response = await S3.send(new ListObjectsV2Command(params));
    if (response && response.Contents) {
      response.Contents.forEach((item) => {
        if (item.Key != undefined) {
          const ext = item.Key.split(".")[item.Key.split(".").length - 1];
          if (["png", "jpg", "jpeg"].includes(ext.toLowerCase())) {
            images.push(item.Key);
          } else if (["mp4"].includes(ext.toLowerCase())) {
            videos.push(item.Key);
          }
        }
      });
      isTruncated = response.IsTruncated as boolean;
      continuationToken = response.NextContinuationToken as string;
    }
  }
}

if (!fs.existsSync(".cache")) fs.mkdirSync(".cache");
if (!fs.existsSync(".cache/objects.json")) {
  log.info("Listing all objects in S3 bucket . . .");
  await listAllObjects(process.env.BUCKET as string, "red_panda");
  fs.writeFileSync(".cache/objects.json", JSON.stringify({ images, videos }));
  log.info(
    `Total: ${images.length + videos.length} | ${images.length} Images | ${
      videos.length
    } Videos`
  );
} else {
  log.info("Using S3 Bucket cache . . .");
  const _cacheFile = fs.readFileSync(".cache/objects.json", {
    encoding: "utf-8",
  });
  images = JSON.parse(_cacheFile)["images"];
  videos = JSON.parse(_cacheFile)["videos"];
  log.info(
    `Total: ${images.length + videos.length} | ${images.length} Images | ${
      videos.length
    } Videos`
  );
}

if (!fs.existsSync("out/data")) fs.mkdirSync("out/data");
if (!fs.existsSync("out/data/images.json")) {
  fs.writeFileSync("out/data/images.json", JSON.stringify(images));
}
if (!fs.existsSync("out/data/videos.json")) {
  fs.writeFileSync("out/data/videos.json", JSON.stringify(videos));
}

import { renderToString } from "react-dom/server";
import IndexPage from "./templates/index";
import fs from "fs";
// function App(props: {}) {
//   return (
//     <html>
//       <head>
//         <link href="./static/tailwind.css" rel="stylesheet" />
//         {environment == "dev" ? (
//           <script src="./static/dev/hotreload.js"></script>
//         ) : (
//           ""
//         )}
//         <title>Bun Render Test</title>
//       </head>
//       <body>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
//           <div key={el} className="flex flex-wrap gap-8">
//             <p className="text-6xl text-red-400">{el}</p>
//             <p className="text-8xl text-green-400">{el * 2}</p>
//           </div>
//         ))}
//       </body>
//     </html>
//   );
// }
let html = renderToString(
  <IndexPage
    title="Wah-Collection"
    environment={environment}
    path="/"
    head={{
      description: "Home page of Wah-Collection by @radiquum",
      image: "https://s3.tebi.io/wahs.wah.su/red_panda/1928. bqiKzsaDPlw.jpg",
      url: process.env.WEB_URL as string,
      preload: [
        `${environment == "prod" ? process.env.WEB_URL : "."}/data/images.json`,
        `${environment == "prod" ? process.env.WEB_URL : "."}/data/videos.json`,
      ],
      dns: [process.env.ENDPOINT as string],
    }}
  />
);

fs.cpSync("src/static", "out/static", { recursive: true });
if (environment == "dev") {
  fs.cpSync("src/static_dev", "out/static/dev", { recursive: true });
}
fs.writeFileSync("out/index.html", html);
