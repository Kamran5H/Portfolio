import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const read = (name) =>
  JSON.parse(fs.readFileSync(path.join("content", name + ".json"), "utf8"));
const text = (value, label) =>
  assert(
    typeof value === "string" && value.trim(),
    label + " must be non-empty text",
  );
const list = (value, label) =>
  assert(
    Array.isArray(value) && value.length,
    label + " must be a non-empty array",
  );
const url = (value, label) => {
  const u = new URL(value);
  assert(u.protocol === "https:", label + " must use HTTPS");
};
const unique = (items, label) => {
  const ids = items.map((i) => i.id);
  assert(new Set(ids).size === ids.length, label + " contains duplicate ids");
};
const statuses = ["LIVE", "PRODUCTION", "OPEN SOURCE", "PRIVATE"];
const categories = ["Research", "Browser", "Automation", "Desktop", "AI"];

try {
  const site = read("site"),
    projects = read("projects"),
    lab = read("lab"),
    vault = read("vault"),
    research = read("research");
  for (const field of ["first", "middle", "last", "urdu"])
    text(site.name[field], "name." + field);
  assert(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email),
    "Invalid contact email",
  );
  url(site.siteUrl, "siteUrl");
  list(site.socials, "socials");
  site.socials.forEach((s) => {
    text(s.label, "social label");
    url(s.href, s.label);
  });
  assert(site.cv.pdf.startsWith("/cv/"), "Public CV must be in /cv/");
  assert(
    fs.existsSync(path.join("public", site.cv.pdf)),
    "Public CV file is missing",
  );
  assert(
    fs
      .readFileSync(path.join("public", site.cv.pdf))
      .subarray(0, 5)
      .toString() === "%PDF-",
    "CV must be a PDF",
  );
  list(site.focus, "focus");
  list(site.path, "path");
  list(site.stack, "stack");
  site.path.forEach((item) =>
    ["years", "title", "where"].forEach((key) =>
      text(item[key], "timeline." + key),
    ),
  );
  site.stack.forEach((group) => {
    text(group.group, "stack group");
    text(group.note, "stack context");
    list(group.tools, "tools");
    group.tools.forEach((t) => text(t, "tool"));
  });
  for (const [label, entries] of Object.entries({
    projects,
    lab,
    vault,
    research,
  })) {
    list(entries, label);
    unique(entries, label);
    entries.forEach((item) => {
      text(item.id, label + " id");
      assert(/^[a-z0-9-]+$/.test(item.id), "Invalid id: " + item.id);
    });
  }
  const targets = new Set(vault.map((v) => v.id));
  vault.forEach((item) =>
    ["label", "group", "blurb"].forEach((k) =>
      text(item[k], item.id + "." + k),
    ),
  );
  projects.forEach((p) => {
    ["name", "hook", "discipline"].forEach((k) => text(p[k], p.id + "." + k));
    assert(statuses.includes(p.status), "Unknown project status");
    list(p.stack, p.id + " stack");
    assert(p.live || p.repo, p.id + " needs a public evidence link");
    if (p.live) url(p.live, p.id);
    if (p.repo) url(p.repo, p.id);
    ["problem", "architecture", "impact"].forEach((k) =>
      text(p.deepDive?.[k], p.id + "." + k),
    );
    list(p.deepDive.highlights, p.id + " highlights");
  });
  lab.forEach((item) => {
    ["name", "line", "lang"].forEach((k) => text(item[k], item.id + "." + k));
    assert(
      statuses.includes(item.status) && categories.includes(item.category),
      "Unknown collection status/category: " + item.id,
    );
    if (item.repo) url(item.repo, item.id);
    else
      assert(
        item.locked && targets.has(item.id),
        item.id + " needs a repo or request target",
      );
    if (item.locked)
      assert(
        !item.repo && item.status === "PRIVATE",
        "Private item must not expose a source link",
      );
  });
  research.forEach((item) => {
    ["category", "title", "status", "summary"].forEach((k) =>
      text(item[k], item.id + "." + k),
    );
    list(item.methods, item.id + " methods");
    assert(
      targets.has(item.vaultTargetId),
      item.id + " points at a missing request target",
    );
  });
  console.log(
    "Content verified: profile, CV, links, unique IDs, project evidence, research and private request references.",
  );
} catch (error) {
  console.error("Content validation failed:", error.message);
  process.exitCode = 1;
}
