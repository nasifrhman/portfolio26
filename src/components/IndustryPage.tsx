import React from 'react';
import { PageHeader } from './PageHeader';
import { TimelineList } from './TimelineList';
import { INDUSTRY_EXPERIENCE } from '../data/portfolioData';

export const IndustryPage: React.FC = () => {
  return (
    <>
      <PageHeader
        kicker="Experience"
        title={
          <>
            Professional Career &amp; <em>Experience.</em>
          </>
        }
      >
        <p>
          A track record of engineering scalable backend architectures, high-performance APIs, and collaborating with international clients to deliver production-ready software solutions.
        </p>
      </PageHeader>

      <section className="wrap" aria-label="Professional Experience Timeline">
        <TimelineList items={INDUSTRY_EXPERIENCE} />
      </section>
    </>
  );
};
