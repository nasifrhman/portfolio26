import React from 'react';
import { PageHeader } from './PageHeader';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectsPage: React.FC = () => {
  const { projects, projectFeatures } = usePortfolio();

  return (
    <>
      <PageHeader
        kicker="Projects"
        title={
          <>
            Engineering &amp; Client <em>Projects.</em>
          </>
        }
      >
        <p>
          A selection of full-stack web applications, backend systems, mobile apps, and platforms built for international clients and active users in production.
        </p>
      </PageHeader>

      <section className="project-showcase wrap" aria-label="Selected software projects">
        {projects.map((project, index) => {
          const feature = projectFeatures[index] || {
            type: 'Software Application',
            subtitle: 'Digital Solution',
            impact: 'Active Production'
          };
          return (
            <article key={project.title} className="project-feature">
              <div className="project-number serif">0{index + 1}</div>
              <div className="project-main">
                <p className="kicker">{feature.type}</p>
                <h2>{project.title}</h2>
                <p className="project-subtitle serif">{feature.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-links mono">
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      Live Site ↗
                    </a>
                  ) : null}
                  {project.ios ? (
                    <a href={project.ios} target="_blank" rel="noopener noreferrer">
                      iOS App ↗
                    </a>
                  ) : null}
                  {project.android ? (
                    <a href={project.android} target="_blank" rel="noopener noreferrer">
                      Android App ↗
                    </a>
                  ) : null}
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>

              <aside className="project-aside">
                <div>
                  <span className="mono">Impact & Scope</span>
                  <strong className="serif">{feature.impact}</strong>
                </div>
                <div>
                  <span className="mono">Stack</span>
                  <div className="project-stack-tags">
                    {project.stack.split('·').map((tech) => (
                      <span key={tech.trim()} className="project-stack-tag mono">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </article>
          );
        })}
      </section>
    </>
  );
};
