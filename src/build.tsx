import { Log } from "./utils";
import { renderToString } from "react-dom/server";
import IndexPage from "./templates/index";
import fs from "fs";
import exec from "child_process";

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
let config = {
  endpoint: process.env.ENDPOINT,
  bucket: process.env.BUCKET,
  prefix: process.env.PREFIX,
};
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
          const obj = item.Key.split("/")[item.Key.split("/").length - 1];
          if (["png", "jpg", "jpeg"].includes(ext.toLowerCase())) {
            images.push(obj);
          } else if (["mp4"].includes(ext.toLowerCase())) {
            videos.push(obj);
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
  await listAllObjects(
    process.env.BUCKET as string,
    process.env.PREFIX as string
  );
  fs.writeFileSync(
    ".cache/objects.json",
    JSON.stringify({ config, images, videos })
  );
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
  config = JSON.parse(_cacheFile)["config"];
  images = JSON.parse(_cacheFile)["images"];
  videos = JSON.parse(_cacheFile)["videos"];
  log.info(
    `Total: ${images.length + videos.length} | ${images.length} Images | ${
      videos.length
    } Videos`
  );
}

if (!fs.existsSync("out/data")) fs.mkdirSync("out/data");
if (!fs.existsSync("out/data/config.json")) {
  fs.writeFileSync("out/data/config.json", JSON.stringify(config));
}
if (!fs.existsSync("out/data/images.json")) {
  fs.writeFileSync("out/data/images.json", JSON.stringify(images));
}
if (!fs.existsSync("out/data/videos.json")) {
  fs.writeFileSync("out/data/videos.json", JSON.stringify(videos));
}

let html = renderToString(
  <IndexPage
    title="Wah-Collection"
    environment={environment}
    path="/"
    head={{
      description: `Home page of Wah-Collection by @radiquum | ${
        images.length
      } Images | ${videos.length} Videos | ${
        images.length + videos.length
      } Total`,
      image: "https://s3.tebi.io/wahs.wah.su/red_panda/1928. bqiKzsaDPlw.jpg",
      url: process.env.WEB_URL as string,
      preload: [
        `${environment == "prod" ? process.env.WEB_URL : "."}/data/config.json`,
        `${environment == "prod" ? process.env.WEB_URL : "."}/data/images.json`,
        `${environment == "prod" ? process.env.WEB_URL : "."}/data/videos.json`,
      ],
      dns: [process.env.ENDPOINT as string, "https://wsrv.nl"],
      script: [
        environment == "dev" ? "/static/dev/hotreload.js" : "",
        environment == "dev" ? "/static/populate_index.js" : "/static/populate_index.min.js"
      ]
    }}
  />
);

fs.cpSync("src/static", "out/static", { recursive: true });
if (environment == "dev") {
  fs.cpSync("src/static_dev", "out/static/dev", { recursive: true });
} else {
  log.info("Minifying resources...");
  exec.exec(
    "bun run tailwindcss -i src/input.css -o out/static/tailwind.min.css --build --minify",
    (error, stdout, stderr) => {
      if (error) {
        log.error(error.message);
        return;
      }
      if (stderr) {
        log.error(stderr);
        return;
      }
      log.info(stdout);
    }
  );

  const transpiler = new Bun.Transpiler({
    loader: "js",
    target: "browser",
    minifyWhitespace: true,
  });

  const files = fs.readdirSync("src/static");
  const minify = files.filter((file) => file.endsWith(".js"));

  minify.forEach((file) => {
    const ext = file.split(".")[file.split(".").length - 1];
    const name = file.split(".")[0];
    const orFile = fs.readFileSync(`src/static/${file}`, {
      encoding: "utf-8",
    });
    const minFile = transpiler.transformSync(orFile);
    fs.writeFileSync(`out/static/${name}.min.${ext}`, minFile);
  });
}
fs.writeFileSync("out/index.html", `<!DOCTYPE html>${html}`);
