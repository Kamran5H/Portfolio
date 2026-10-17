import test from "node:test";
import assert from "node:assert/strict";
import {
  readCollection,
  writeCollection,
  filterCollection,
} from "../lib/collection.mjs";

const projects = [
  {
    id: "b",
    name: "Beta",
    line: "Research papers",
    lang: "Python",
    category: "Research",
    status: "OPEN SOURCE",
    repo: "https://example.com/b",
  },
  {
    id: "a",
    name: "Alpha",
    line: "Private papers",
    lang: "Python",
    category: "Research",
    status: "PRIVATE",
  },
  {
    id: "c",
    name: "Gamma",
    line: "Browser utility",
    lang: "TypeScript",
    category: "Browser",
    status: "OPEN SOURCE",
    repo: "https://example.com/c",
  },
  {
    id: "d",
    name: "Delta",
    line: "Automation",
    lang: "Python",
    category: "Automation",
    status: "PRIVATE",
  },
];
const ids = projects.map((item) => item.id);
test("shared links reject unknown IDs, duplicates and excess selections", () => {
  const state = readCollection(
    "?category=untrusted&sort=unknown&compare=b,b,missing,a,c,d",
    ids,
  );
  assert.equal(state.category, "All");
  assert.equal(state.sort, "curated");
  assert.deepEqual(state.compare, ["b", "a", "c"]);
});
test("shared collection round-trips Unicode search and every control", () => {
  const state = {
    category: "Research",
    query: "علم & Python",
    sort: "name",
    publicOnly: true,
    compare: ["b", "a"],
  };
  const search = writeCollection("?ref=portfolio", state);
  assert.deepEqual(readCollection(search, ids), state);
  assert.equal(new URLSearchParams(search).get("ref"), "portfolio");
});
test("default controls remove stale collection parameters without removing unrelated parameters", () => {
  assert.equal(
    writeCollection(
      "?q=old&category=AI&sort=name&access=public&compare=b&ref=ok",
      readCollection("", ids),
    ),
    "ref=ok",
  );
});
test("search intersects words, category and public access", () => {
  const state = readCollection(
    "?q=python+papers&category=Research&access=public",
    ids,
  );
  assert.deepEqual(
    filterCollection(projects, state).map((item) => item.id),
    ["b"],
  );
  assert.deepEqual(
    filterCollection(projects, { ...state, query: "missing" }),
    [],
  );
});
test("alphabetical order does not mutate curated order or selections", () => {
  const state = readCollection("?sort=name&compare=c,b", ids);
  assert.deepEqual(
    filterCollection(projects, state).map((item) => item.id),
    ["a", "b", "d", "c"],
  );
  assert.deepEqual(
    projects.map((item) => item.id),
    ids,
  );
  assert.deepEqual(state.compare, ["c", "b"]);
});
test("untrusted query strings are bounded", () => {
  assert.equal(readCollection(`?q=${"x".repeat(1000)}`, ids).query.length, 200);
});
