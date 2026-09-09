import React from 'react';
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
      <section className="editorial-section wrap" aria-labelledby="research-path-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ Research path</p>
            <h1 id="research-path-title">Research Experience</h1>
          </div>
          <p>
            I now lead teams through the full lifecycle: framing, study design, execution, evaluation, and writing.
          </p>
        </div>
        <TimelineList items={RESEARCH_EXPERIENCE} />
      </section>

      <section className="editorial-section wrap" aria-labelledby="research-areas-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ Research areas</p>
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
            <p className="kicker">§ Reviewer experience</p>
            <h2 id="reviewing-title">Reviewer Experience</h2>
            <p className="review-count-summary">
              I have completed {totalReviews} manuscript reviews across {q1Count} Q1 journals.
            </p>
          </div>
          <p>
            Reviewing is part of my research practice: test the claim, inspect the evidence, and help make the work more rigorous and legible.
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
