export const COLLECTION_CATEGORIES = [
  "All",
  "Research",
  "Browser",
  "Automation",
  "Desktop",
  "AI",
];

/** @param {string} search @param {string[]} validIds */
export function readCollection(search, validIds) {
  const params = new URLSearchParams(search);
  const category = params.get("category") || "All";
  return {
    category: COLLECTION_CATEGORIES.includes(category) ? category : "All",
    query: (params.get("q") || "").slice(0, 200),
    sort: params.get("sort") === "name" ? "name" : "curated",
    publicOnly: params.get("access") === "public",
    compare: [...new Set((params.get("compare") || "").split(","))]
      .filter((id) => validIds.includes(id))
      .slice(0, 3),
  };
}

/** @param {string} search @param {ReturnType<typeof readCollection>} state */
export function writeCollection(search, state) {
  const params = new URLSearchParams(search);
  const values = {
    category: state.category === "All" ? "" : state.category,
    q: state.query,
    sort: state.sort === "name" ? "name" : "",
    access: state.publicOnly ? "public" : "",
    compare: state.compare.join(","),
  };
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  return params.toString();
}

/**
 * @template {{id:string,name:string,line:string,lang:string,category:string,status:string,repo?:string}} T
 * @param {T[]} projects @param {ReturnType<typeof readCollection>} state
 */
export function filterCollection(projects, state) {
  const words = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const result = projects.filter((item) => {
    const text =
      `${item.name} ${item.line} ${item.lang} ${item.category} ${item.status}`.toLowerCase();
    return (
      (state.category === "All" || item.category === state.category) &&
      (!state.publicOnly || Boolean(item.repo)) &&
      words.every((word) => text.includes(word))
    );
  });
  return state.sort === "name"
    ? result.sort((a, b) => a.name.localeCompare(b.name))
    : result;
}
