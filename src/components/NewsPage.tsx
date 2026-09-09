import React from 'react';
import { PageHeader } from './PageHeader';
import { NEWS_DATA } from '../data/portfolioData';

export const NewsPage: React.FC = () => {
  return (
    <>
      <PageHeader
        kicker="News"
        title={
          <>
            Milestones, updates, and <em>moments along the way.</em>
          </>
        }
      >
        <p>
          Paper submissions and acceptances, workshops, teaching, professional work, and other developments worth sharing.
        </p>
      </PageHeader>

      <section className="editorial-section wrap news-page" aria-labelledby="all-news-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ News archive</p>
            <h2 id="all-news-title">All Updates</h2>
          </div>
          <p>Listed in reverse chronological order.</p>
        </div>

        <div className="news-list">
          {NEWS_DATA.map((item) => (
            <article key={`${item.date}-${item.title}`}>
              <div className="news-date">
                <time className="mono">{item.date}</time>
                <span className="news-category mono">{item.category}</span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Read source <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
