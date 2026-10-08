import React from 'react';
import { PageHeader } from './PageHeader';
import { TimelineList } from './TimelineList';
import { usePortfolio } from '../context/PortfolioContext';

export const EducationPage: React.FC = () => {
  const { education, honors } = usePortfolio();

  return (
    <>
      <PageHeader
        kicker="Education"
        title={
          <>
            Academic Foundation &amp; <em>Degrees.</em>
          </>
        }
      >
        <p>
          BSc in Computer Science &amp; Engineering from American International University–Bangladesh (AIUB) with research assistantship, top academic standing, and graduation honors.
        </p>
      </PageHeader>

      <section className="wrap" aria-label="Academic Degrees Timeline">
        <TimelineList items={education} />
      </section>

      <section className="editorial-section wrap" aria-labelledby="honors-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">Honors &amp; Awards</p>
            <h2 id="honors-title">Recognition Along the Way</h2>
          </div>
        </div>
        <div className="honor-list">
          {honors.map((honor) => (
            <article key={`${honor.title}-${honor.year}`}>
              <div>
                <h3>{honor.title}</h3>
                {honor.detail ? <p>{honor.detail}</p> : null}
              </div>
              <span className="mono">{honor.year}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
