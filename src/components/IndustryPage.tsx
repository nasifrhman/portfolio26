import React from 'react';
import { TimelineList } from './TimelineList';
import { INDUSTRY_EXPERIENCE } from '../data/portfolioData';

export const IndustryPage: React.FC = () => {
  return (
    <section className="editorial-section wrap" aria-labelledby="industry-experience-title">
      <div className="section-heading compact">
        <div>
          <p className="kicker">§ Industry experience</p>
          <h1 id="industry-experience-title">Industry Experience</h1>
        </div>
      </div>
      <TimelineList items={INDUSTRY_EXPERIENCE} />
    </section>
  );
};
