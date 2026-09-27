import React from 'react';
import { PageHeader } from './PageHeader';
import { TimelineList } from './TimelineList';
import { TEACHING_EXPERIENCE } from '../data/portfolioData';

export const TeachingPage: React.FC = () => {
  return (
    <>
      <PageHeader
        kicker="Academic"
        title={
          <>
            Teaching &amp; Academic <em>Mentorship.</em>
          </>
        }
      >
        <p>
          Mentoring undergraduate students in computer science, software design principles, algorithms, and applied machine learning methodologies.
        </p>
      </PageHeader>

      <section className="wrap" aria-label="Teaching Experience Timeline">
        <TimelineList items={TEACHING_EXPERIENCE} />
      </section>
    </>
  );
};
