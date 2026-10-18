import test from "node:test";
import assert from "node:assert/strict";
import { resolvePortfolioView } from "../lib/portfolio-view.mjs";
test("new visitors enter the studio and an explicit reading preference persists", () => {
  assert.equal(resolvePortfolioView("", "", null), "studio");
  assert.equal(resolvePortfolioView("", "", "reading"), "reading");
  assert.equal(resolvePortfolioView("", "", "invalid"), "studio");
});
test("existing section and molecular-viewer links open the complete reading view", () => {
  for (const hash of [
    "#work",
    "#research",
    "#lab",
    "#framework-viewer",
    "#main-content",
    "#contact",
  ])
    assert.equal(resolvePortfolioView(hash, "", "studio"), "reading");
});
test("shared collection state remains accessible even without an anchor", () => {
  for (const query of [
    "?compare=reviewforge",
    "?q=python",
    "?category=Research",
    "?sort=name",
    "?access=public",
  ])
    assert.equal(resolvePortfolioView("", query, "studio"), "reading");
  assert.equal(resolvePortfolioView("", "?ref=academic", null), "studio");
});
test("explicit studio room links override a previously saved reading preference", () => {
  for (const room of ["entrance", "research", "software", "library", "contact"])
    assert.equal(
      resolvePortfolioView(`#studio-${room}`, "", "reading"),
      "studio",
    );
});
