import React from 'react';
import { PageHeader } from './PageHeader';
import { MilestonesTimeline } from './MilestonesTimeline';
import { usePortfolio } from '../context/PortfolioContext';

export const NewsPage: React.FC = () => {
  const { news } = usePortfolio();

  return (
    <>
      <PageHeader
        kicker="Timeline"
        title={
          <>
            Career &amp; Research <em>Milestones.</em>
          </>
        }
      >
        <p>
          Chronological record of peer-reviewed paper publications, company promotions, academic graduation, and professional achievements.
        </p>
      </PageHeader>

      <section className="wrap news-page" aria-label="Milestones Timeline Archive">
        <MilestonesTimeline items={news} />
      </section>
    </>
  );
};
