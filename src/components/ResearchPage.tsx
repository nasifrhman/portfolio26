import React from 'react';
import { PageHeader } from './PageHeader';
import { TimelineList } from './TimelineList';
import {
  RESEARCH_EXPERIENCE,
  RESEARCH_AREAS,
  PEER_REVIEWS
} from '../data/portfolioData';

export const ResearchPage: React.FC = () => {
  const totalReviews = PEER_REVIEWS.reduce((acc, curr) => acc + curr.reviews, 0);
  const q1Count = PEER_REVIEWS.filter((item) => item.rank === 'Q1').length;

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

      <section className="editorial-section wrap" aria-labelledby="research-path-title">
        <div className="section-heading compact">
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

      <section className="editorial-section wrap" aria-labelledby="research-areas-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">Research Areas</p>
            <h2 id="research-areas-title">Research Interests</h2>
          </div>
        </div>
        <div className="research-area-grid">
          {RESEARCH_AREAS.map((area, index) => (
            <article key={area.title}>
              <span className="mono">0{index + 1}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section wrap" aria-labelledby="reviewing-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">Reviewer Experience</p>
            <h2 id="reviewing-title">Reviewer Experience</h2>
            <p className="review-count-summary">
              Completed {totalReviews} manuscript review across {q1Count} Q1 international journal.
            </p>
          </div>
          <p>
            Reviewing is part of my research practice: evaluating claims, inspecting experimental evidence, and upholding scientific rigor.
          </p>
        </div>

        <div className="review-table">
          {PEER_REVIEWS.map((item) => (
            <article key={item.journal} className="paper-row review-row">
              <div className="paper-year-block">
                <span className="paper-year serif">{item.rank}</span>
              </div>
              <div className="paper-content">
                <h3>{item.journal}</h3>
                <dl className="paper-details">
                  <div>
                    <dt>Publisher</dt>
                    <dd>{item.publisher}</dd>
                  </div>
                  <div>
                    <dt>Completed Reviews</dt>
                    <dd>
                      {item.reviews} {item.reviews === 1 ? 'Review' : 'Reviews'}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
