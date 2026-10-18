/** @param {string} hash @param {string} search @param {string|null} saved */
export function resolvePortfolioView(hash, search, saved) {
  if (/^#studio-(entrance|research|software|library|contact)$/.test(hash))
    return "studio";
  if (hash && hash !== "#") return "reading";
  const params = new URLSearchParams(search);
  if (
    ["compare", "q", "category", "access", "sort"].some((key) =>
      params.has(key),
    )
  )
    return "reading";
  return saved === "reading" ? "reading" : "studio";
}
