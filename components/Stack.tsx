import { STACK } from "@/lib/site";
export default function Stack() {
  return (
    <section
      id="stack"
      className="section-shell section-space"
      aria-labelledby="methods-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Methods &amp; tools</p>
          <h2 id="methods-title" className="display">
            Chemistry meets
            <br />
            <em>implementation.</em>
          </h2>
        </div>
        <p>
          A working toolkit across research, software development, and
          automation. Projects and research summaries above provide context for
          how these tools are used.
        </p>
      </div>
      <div className="toolkit-grid">
        {STACK.map((group) => (
          <article key={group.group}>
            <span className="eyebrow">{group.note}</span>
            <h3>{group.group}</h3>
            <ul>
              {group.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
