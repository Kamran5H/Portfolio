import fs from "node:fs";
import path from "node:path";

const read = (name) =>
  JSON.parse(fs.readFileSync(`content/${name}.json`, "utf8"));
const artifacts = read("artifacts");
const projects = [...read("projects"), ...read("lab")];
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[c],
  );
function lines(value, limit) {
  const result = [];
  for (const word of value.split(/\s+/)) {
    if (!result.length || result.at(-1).length + word.length + 1 > limit)
      result.push(word);
    else result[result.length - 1] += " " + word;
  }
  return result;
}
const text = (value, x, y, size = 15, colour = "#52635f", limit = 38) =>
  `<text x="${x}" y="${y}" fill="${colour}" font-size="${size}" font-family="Arial, sans-serif">${lines(
    value,
    limit,
  )
    .map(
      (line, i) =>
        `<tspan x="${x}" dy="${i ? size * 1.5 : 0}">${escape(line)}</tspan>`,
    )
    .join("")}</text>`;
fs.mkdirSync("public/artifacts", { recursive: true });
for (const artifact of artifacts) {
  const project = projects.find((p) => p.id === artifact.id);
  const cards = artifact.stages
    .map((stage, i) => {
      const x = 48 + i * 374;
      return `<g><rect x="${x}" y="240" width="356" height="430" rx="6" fill="#fffcf5" stroke="#c8cec3"/>${text(`0${i + 1} / ${stage.label}`, x + 24, 279, 12, "#246356", 38)}${text(stage.title, x + 24, 321, 23, "#283b37", 24)}${text(stage.detail, x + 24, 410, 15, "#52635f", 35)}<path d="M${x + 24} 520h308" stroke="#c8cec3"/>${text(stage.items.slice(0, 3).join(" • "), x + 24, 552, 13, "#52635f", 39)}</g>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-labelledby="title description"><title id="title">${escape(project.name)} — workflow study</title><desc id="description">${escape(artifact.note)}</desc><rect width="1200" height="800" fill="#f6f4ed"/><path d="M48 45h1104" stroke="#c8cec3"/>${text("MUHAMMAD KAMRAN ASHRAF / PROJECT NOTEBOOK", 48, 78, 12, "#246356", 100)}${text(project.name, 48, 133, 39, "#283b37", 49)}${text(artifact.label, 48, 210, 18, "#52635f", 100)}${cards}${text("Illustrative workflow study · Sample content · Not an application screenshot", 48, 718, 12, "#52635f", 120)}${text(project.repo || project.live || "Private project · Available for discussion", 48, 747, 13, "#246356", 130)}${text("kamranashraf.is-a.dev", 48, 775, 12, "#52635f", 100)}</svg>`;
  fs.writeFileSync(path.join("public/artifacts", `${artifact.id}.svg`), svg);
}
console.log(`Generated ${artifacts.length} project workflow sheets.`);
