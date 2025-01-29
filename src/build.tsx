import { Log } from "./utils";

const environment: "prod" | "dev" =
  (process.env.ENVIRONMENT as "prod" | "dev") || "prod";
const log = new Log();

if (environment == "dev") {
  log.warn("Running in a dev mode!");
}

if (!fs.existsSync("out")) fs.mkdirSync("out");

import { renderToString } from "react-dom/server";
import fs from "fs";
function App(props: {}) {
  return (
    <html>
      <head>
        <link href="./static/tailwind.css" rel="stylesheet" />
        {environment == "dev" ? <script src="./static/dev/hotreload.js"></script> : ""}
        <title>Bun Render Test</title>
      </head>
      <body>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((el) => (
          <div key={el} className="flex flex-wrap gap-8">
            <p className="text-6xl text-red-400">{el}</p>
            <p className="text-8xl text-green-400">{el * 2}</p>
          </div>
        ))}
      </body>
    </html>
  );
}
let html = renderToString(<App />);

fs.cpSync("src/static", "out/static", { recursive: true });
if (environment == "dev") {
  fs.cpSync("src/static_dev", "out/static/dev", { recursive: true });
}
fs.writeFileSync("out/index.html", html);
