import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
if (!fs.existsSync(path.join(root, "index.html")))
  throw new Error("Run npm run build before starting the static preview.");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};
const server = http.createServer((req, res) => {
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    return res.end();
  }
  let target;
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const resolved = path.resolve(root, "." + pathname);
    if (resolved !== root && !resolved.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    target = [
      resolved,
      resolved + ".html",
      path.join(resolved, "index.html"),
    ].find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  } catch {
    res.writeHead(400);
    return res.end();
  }
  const status = target ? 200 : 404;
  target ||= path.join(root, "404.html");
  res.writeHead(status, {
    "Content-Type": types[path.extname(target)] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache",
  });
  if (req.method === "HEAD") return res.end();
  const stream = fs.createReadStream(target);
  stream.on("error", () => res.destroy());
  stream.pipe(res);
});
server.listen(Number(process.env.PORT || 3100), "127.0.0.1", () =>
  console.log("Local: http://127.0.0.1:" + server.address().port),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
