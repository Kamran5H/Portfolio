# Interactive Comparison Widget Guardrails

1. **Coordinate & Math Synchronization**:
   - Always verify that the visual reveal direction matches the slider direction and the metric score math.
   - If sliding to the right reveals state B, the score, badge status, and color status must correspond to state B, never state A.
   - Verify both edge bounds (0% and 100%) and intermediate states.

2. **Accessible Sliders**:
   - Every interactive range input must have a visible `:focus-visible` indicator, an explicit `aria-label`, and `aria-valuetext` explaining the current value's semantic meaning.
