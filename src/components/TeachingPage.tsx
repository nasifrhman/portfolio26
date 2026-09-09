import React from 'react';
import { TimelineList } from './TimelineList';
import { TEACHING_EXPERIENCE } from '../data/portfolioData';

export const TeachingPage: React.FC = () => {
  return (
    <section className="editorial-section wrap" aria-labelledby="teaching-experience-title">
      <div className="section-heading compact">
        <div>
          <p className="kicker">§ Teaching experience</p>
          <h1 id="teaching-experience-title">Teaching Experience</h1>
        </div>
      </div>
      <TimelineList items={TEACHING_EXPERIENCE} />
    </section>
  );
};
