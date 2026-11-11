import React from 'react';
import { PageHeader } from './PageHeader';
import { TimelineList } from './TimelineList';
import {
  RESEARCH_EXPERIENCE,
  RESEARCH_AREAS
} from '../data/portfolioData';

export const ResearchPage: React.FC = () => {
  return (
    <>
      <PageHeader
        kicker="Research"
        title={
          <>
            Machine Learning &amp; <em>Scientific Research.</em>
          </>
        }
      >
        <p>
          Investigating neural computing, model averaging acceleration, and cluster-based algorithms with published work in top-ranked international journals.
        </p>
      </PageHeader>

      <section className="editorial-section wrap anim-scroll-section" aria-labelledby="research-path-title">
        <div className="section-heading compact anim-scroll-item">
          <div>
            <p className="kicker">Research Experience</p>
            <h2 id="research-path-title">Academic &amp; Lab Roles</h2>
          </div>
          <p>
            Leading research workflows through study framing, design, experimental evaluation, and manuscript preparation.
          </p>
        </div>
        <TimelineList items={RESEARCH_EXPERIENCE} />
      </section>

      <section className="editorial-section wrap anim-scroll-section" aria-labelledby="research-areas-title">
        <div className="section-heading compact anim-scroll-item">
          <div>
            <p className="kicker">Research Areas</p>
            <h2 id="research-areas-title">Research Interests</h2>
          </div>
        </div>
        <div className="research-area-grid">
          {RESEARCH_AREAS.map((area, index) => (
            <article
              key={area.title}
              className="anim-scroll-item"
              style={{ '--item-delay': `${index * 0.08}s` } as React.CSSProperties}
            >
              <span className="mono">0{index + 1}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
