# Collection explorer

The software collection supports multiword search, category selection, public-repository filtering, curated or alphabetical order, and comparison of up to three projects. Comparison shows existing catalog descriptions, technology, discipline and source availability. It makes no quality or performance rankings.

The share action creates a link containing the current filters and selected project IDs. It copies the link or exposes a selectable field if clipboard access fails. Opening that link restores the collection after hydration. The URL is the state store; browser history navigation is observed, unrelated query parameters are preserved during editing, and shared links omit unrelated parameters. Filter edits replace the current history entry rather than creating an entry per keystroke.

Unknown categories and sorting options fall back to defaults. Unknown and duplicate project IDs are removed, comparison is capped at three, and query length is capped at 200 characters. Filtering does not clear the comparison. Public access is determined by the catalog repository URL rather than a marketing status label.

All controls use native buttons, inputs, labels and selects. Selection state is announced alongside the result count. The comparison stacks at widths below 700px, follows the existing light and dark tokens, and introduces no animation, storage dependency, network request or additional library. Removing items from the comparison restores focus to the collection heading. Workflow previews retain the existing dialog behavior.

Six regression tests in `tests/collection.test.mjs` cover shared-link validation, Unicode round trips, parameter cleanup, intersecting filters, non-mutating sorting and query bounds. Visual inspection and browser interaction checks must be recorded separately; these tests do not establish rendered layout or keyboard behavior.
