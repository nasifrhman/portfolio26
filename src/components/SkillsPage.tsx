import React from 'react';
import { PageHeader } from './PageHeader';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillsConvergence } from './SkillsConvergence';

export const SkillsPage: React.FC = () => {
  return (
    <>
      <PageHeader
        kicker="Skills & Technologies"
        title={
          <>
            Technical Expertise &amp; <em>Core Stack.</em>
          </>
        }
      >
        <p>
          A comprehensive ledger of programming languages, backend frameworks, cloud devops tooling, database systems, and research proficiencies I utilize to build performant, production-ready software.
        </p>
      </PageHeader>

      <section className="editorial-section wrap" aria-labelledby="skills-ledger-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">Proficiencies &amp; Tooling</p>
            <h2 id="skills-ledger-title">What I carry into every build.</h2>
          </div>
        </div>

        <div className="skills-ledger">
          {SKILLS_DATA.map((skill) => (
            <article key={skill.title} className="skill-card">
              <div className="skill-card-header">
                <h3>{skill.title}</h3>
              </div>
              <div className="skill-tag-cloud">
                {skill.description.split(',').map((tech) => (
                  <span key={tech.trim()} className="skill-pill mono">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Core Stack Logos Showcase with Scroll-Driven Sequential Wave Animation */}
      <SkillsConvergence />
    </>
  );
};
