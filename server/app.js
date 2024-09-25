import express from "express";
import { createReadStream, statSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/video", (req, res) => {
  const filepath = `${__dirname}/public/video.mp4`;
  const stat = statSync(filepath);
  const fileSize = stat.size;

  const range = req.headers.range;

  if (!range) {
    res.status(400).send("Required Range header");
  }

  const chunckSize = 10 ** 6;

  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunckSize, fileSize);

  const contentLength = end - start + 1;

  const fileStream = createReadStream(filepath, {
    start,
    end,
  });

  fileStream.pipe(res);

  const header = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, header);
});

app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
