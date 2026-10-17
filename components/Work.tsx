import { FLAGSHIPS } from "@/lib/site";
import StatusBadge from "./StatusBadge";

const DIAGRAMS: Record<string, string[]> = {
  "articles-downloader": [
    "Research question",
    "Search · rank · deduplicate",
    "Open-access PDFs + citations",
  ],
  "qau-kalam": [
    "University community",
    "Student access · shared spaces",
    "Feed · mentors · conversations",
  ],
  "subah-taskbook": [
    "Today’s focus",
    "Complete · reflect · carry forward",
    "A fresh start tomorrow",
  ],
};
export default function Work() {
  return (
    <section id="work" className="section-band" aria-labelledby="work-title">
      <div className="section-shell section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Selected software</p>
            <h2 id="work-title" className="display">
              Built around
              <br />
              <em>real work.</em>
            </h2>
          </div>
          <p>
            Tools for literature discovery, university life, and daily focus.
            Each case study explains the problem, the implementation, and what
            the software enables.
          </p>
        </div>
        <div className="project-list">
          {FLAGSHIPS.map((project, index) => (
            <article key={project.id} className="project-card">
              <div className="project-summary">
                <div className="card-topline">
                  <span className="eyebrow">
                    0{index + 1} / {project.discipline}
                  </span>
                  <StatusBadge status={project.status} />
                </div>
                <h3 className="display">{project.name}</h3>
                <p>{project.hook}</p>
                <ul
                  className="tag-list"
                  aria-label={`${project.name} technologies`}
                >
                  {project.stack.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
                <div className="project-actions">
                  {project.repo && (
                    <a
                      className="btn btn-ghost"
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source &amp; documentation{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.live && (
                    <a
                      className="text-link"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit project <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-notes">
                <div
                  className="workflow-diagram"
                  aria-label={`${project.name} workflow`}
                >
                  <span className="eyebrow">Workflow overview</span>
                  {DIAGRAMS[project.id]?.map((step, i) => (
                    <div key={step}>
                      <span className="workflow-step">{i + 1}</span>
                      <span>{step}</span>
                      {i < 2 && (
                        <span className="workflow-arrow" aria-hidden="true">
                          ↓
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {project.deepDive && (
                  <details className="project-details">
                    <summary>
                      Read the case study <span aria-hidden="true">+</span>
                    </summary>
                    <dl>
                      <dt>The problem</dt>
                      <dd>{project.deepDive.problem}</dd>
                      <dt>Implementation &amp; tradeoffs</dt>
                      <dd>{project.deepDive.architecture}</dd>
                      <dt>What it enables</dt>
                      <dd>{project.deepDive.impact}</dd>
                    </dl>
                    <ul>
                      {project.deepDive.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
