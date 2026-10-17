import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = fileURLToPath(new URL("../", import.meta.url));
const validator = path.join(root, "scripts/check-content.mjs");
function fixture(run) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-content-"));
  try {
    fs.cpSync(path.join(root, "content"), path.join(temp, "content"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(temp, "public/cv"), { recursive: true });
    fs.copyFileSync(
      path.join(root, "public/cv/KAMRAN-ASHRAF-CV.pdf"),
      path.join(temp, "public/cv/KAMRAN-ASHRAF-CV.pdf"),
    );
    const mutate = (name, change) => {
      const file = path.join(temp, "content", name + ".json");
      const data = JSON.parse(fs.readFileSync(file, "utf8"));
      change(data);
      fs.writeFileSync(file, JSON.stringify(data));
    };
    const validate = () =>
      spawnSync(process.execPath, [validator], { cwd: temp, encoding: "utf8" });
    run({ mutate, validate, temp });
  } finally {
    const resolved = path.resolve(temp);
    assert(
      resolved.startsWith(
        path.resolve(os.tmpdir()) + path.sep + "portfolio-content-",
      ),
    );
    fs.rmSync(resolved, { recursive: true, force: true });
  }
}
test("release content satisfies the complete public contract", () =>
  fixture(({ validate }) => {
    const result = validate();
    assert.equal(result.status, 0, result.stderr);
  }));
test("duplicate project IDs fail instead of silently breaking React keys", () =>
  fixture(({ mutate, validate }) => {
    mutate("projects", (p) => p.push({ ...p[0] }));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /duplicate ids/);
  }));
test("unsafe project URLs are rejected before publication", () =>
  fixture(({ mutate, validate }) => {
    mutate("projects", (p) => (p[0].repo = "javascript:alert(1)"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /HTTPS/);
  }));
test("dangling research requests fail before visitors see a wrong document", () =>
  fixture(({ mutate, validate }) => {
    mutate("research", (p) => (p[0].vaultTargetId = "missing-record"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /missing request target/);
  }));
test("a missing public CV fails the build", () =>
  fixture(({ temp, validate }) => {
    fs.unlinkSync(path.join(temp, "public/cv/KAMRAN-ASHRAF-CV.pdf"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /CV file is missing/);
  }));
test("an absent artifact cannot leave a project without a working preview", () =>
  fixture(({ mutate, validate }) => {
    mutate("artifacts", (a) => a.pop());
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Every project must have exactly one artifact/);
  }));
test("an unsupported preview visual is rejected before publication", () =>
  fixture(({ mutate, validate }) => {
    mutate("artifacts", (a) => (a[0].stages[0].mode = "unknown-scene"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Unknown artifact stage visual/);
  }));
test("WhatsApp links cannot silently contain a local or malformed number", () =>
  fixture(({ mutate, validate }) => {
    mutate("site", (site) => (site.contactChannels.whatsapp = "0307 0325132"));
    const result = validate();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /international/);
  }));
