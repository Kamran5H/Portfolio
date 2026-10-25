import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const validator = path.join(root, "scripts/check-export.mjs");
function fixture(run) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-export-"));
  try {
    fs.cpSync(path.join(root, "content"), path.join(temp, "content"), {
      recursive: true,
    });
    fs.copyFileSync(
      path.join(root, "staticwebapp.config.json"),
      path.join(temp, "staticwebapp.config.json"),
    );
    const artifacts = JSON.parse(
      fs.readFileSync(path.join(root, "content/artifacts.json"), "utf8"),
    );
    const site = JSON.parse(
      fs.readFileSync(path.join(root, "content/site.json"), "utf8"),
    );
    const write = (file, value = "fixture") => {
      const target = path.join(temp, "out", file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, value);
    };
    for (const file of [
      "404.html",
      "robots.txt",
      "sitemap.xml",
      "cv/KAMRAN-ASHRAF-CV.pdf",
      "og-image.png",
      "favicon.ico",
      "images/certificate-presentation.jpg",
      "images/kamran-portrait.jpg",
    ])
      write(file);
    for (const artifact of artifacts)
      write(`artifacts/${artifact.id}.svg`, "Illustrative workflow study");
    write(
      "index.html",
      `<html><head><link rel="canonical" href="${site.siteUrl}/"><script type="application/ld+json">{}</script></head><body><h1>Portfolio fixture</h1>${["main-content", "top", "research", "background", "work", "stack", "lab", "contact"].map((id) => `<section id="${id}"></section>`).join("")}<a href="https://wa.me/${site.contactChannels.whatsapp.replace(/\D/g, "")}">WhatsApp</a><p>${site.contactChannels.wechat}</p></body></html>`,
    );
    const validate = () =>
      spawnSync(process.execPath, [validator], { cwd: temp, encoding: "utf8" });
    run({ validate, temp });
  } finally {
    const resolved = path.resolve(temp);
    assert(
      resolved.startsWith(
        path.resolve(os.tmpdir()) + path.sep + "portfolio-export-",
      ),
    );
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}

test("a complete static export passes and receives the actual hosting config", () =>
  fixture(({ validate, temp }) => {
    const result = validate();
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(
      JSON.parse(
        fs.readFileSync(path.join(temp, "out/staticwebapp.config.json")),
      ),
      JSON.parse(fs.readFileSync(path.join(root, "staticwebapp.config.json"))),
    );
  }));

test("every project workflow must be included in the public export", () =>
  fixture(({ validate, temp }) => {
    fs.unlinkSync(path.join(temp, "out/artifacts/reviewforge.svg"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Missing project workflow sheet/);
  }));

test("a missing certificate photo cannot pass the release check", () =>
  fixture(({ validate, temp }) => {
    fs.unlinkSync(path.join(temp, "out/images/certificate-presentation.jpg"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Missing export: images/);
  }));
