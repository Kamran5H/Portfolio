import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = path.resolve("out");
const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
try {
  assert(fs.existsSync(root), "Missing out/; run the production build first.");
  fs.copyFileSync(
    "staticwebapp.config.json",
    path.join(root, "staticwebapp.config.json"),
  );
  const files = walk(root);
  for (const required of [
    "index.html",
    "404.html",
    "robots.txt",
    "sitemap.xml",
    "cv/KAMRAN-ASHRAF-CV.pdf",
    "og-image.png",
    "favicon.ico",
    "staticwebapp.config.json",
  ])
    assert(
      fs.existsSync(path.join(root, required)),
      "Missing export: " + required,
    );
  const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
  for (const id of [
    "main-content",
    "top",
    "research",
    "background",
    "work",
    "stack",
    "lab",
    "contact",
  ])
    assert(
      home.includes('id="' + id + '"'),
      "Missing navigation target: " + id,
    );
  assert(
    (home.match(/<h1[ >]/g) || []).length === 1,
    "Home must have exactly one H1",
  );
  assert(
    home.includes("application/ld+json") && home.includes('rel="canonical"'),
    "Missing search metadata",
  );
  for (const file of files.filter((f) => f.endsWith(".html"))) {
    const html = fs.readFileSync(file, "utf8");
    for (const match of html.matchAll(
      /(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g,
    )) {
      if (match[1].startsWith("//")) continue;
      const target = path.resolve(root, "." + decodeURIComponent(match[1]));
      assert(
        target === root || target.startsWith(root + path.sep),
        "Export link escapes the site",
      );
      assert(
        [target, target + ".html", path.join(target, "index.html")].some((p) =>
          fs.existsSync(p),
        ),
        "Broken local asset/link: " + match[1],
      );
    }
  }
  assert(
    !files.some((f) =>
      /(?:^|[\\/])(?:(?:private_upload|scratch|\.git)(?:[\\/]|$)|\.env(?:\.|$))/.test(
        f,
      ),
    ),
    "Private staging included in export",
  );
  console.log(
    "Static export verified: page structure, metadata, navigation, local assets, CV, true 404, and Azure configuration.",
  );
} catch (error) {
  console.error("Export validation failed:", error.message);
  process.exitCode = 1;
}
