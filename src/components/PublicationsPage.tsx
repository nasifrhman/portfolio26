import React, { useState, useMemo } from 'react';
import { PageHeader } from './PageHeader';
import { Publication, PublicationStatus } from '../types/portfolio';
import { STATUS_MAP } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

const STATUS_FILTERS: [PublicationStatus | 'all', string][] = [
  ['all', 'All'],
  ['published', 'Published'],
  ['accepted', 'Accepted'],
  ['review', 'Under Review'],
  ['preparation', 'In Preparation']
];

interface PublicationRowProps {
  publication: Publication;
  selected?: boolean;
}

const PublicationRow: React.FC<PublicationRowProps> = ({ publication, selected = false }) => {
  const statusConfig = STATUS_MAP[publication.status];

  return (
    <article className={`paper-row${selected ? ' selected' : ''}`}>
      <div className="paper-year-block">
        <span className="paper-year serif">{publication.year || '—'}</span>
        <span className={`status ${statusConfig.className}`}>{statusConfig.label}</span>
      </div>

      <div className="paper-content">
        <h3>
          {publication.url ? (
            <a href={publication.url} target="_blank" rel="noopener noreferrer">
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h3>

        <p className="paper-authors">
          {publication.authors.map((author, index) => {
            const authorUrl = publication.authorUrls?.[author];
            const isSelf = author === 'Md. Nasifur Rahman' || author === 'Nasif Rahman';
            return (
              <span key={`${publication.title}-${author}`}>
                {authorUrl ? (
                  <a
                    href={authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="author-link"
                    title={`View ${author} on Springer`}
                  >
                    {isSelf ? <strong>{author}</strong> : author}
                  </a>
                ) : isSelf ? (
                  <strong>{author}</strong>
                ) : (
                  author
                )}
                {index < publication.authors.length - 1 ? ', ' : ''}
              </span>
            );
          })}
        </p>

        <dl className="paper-details">
          <div>
            <dt>Venue</dt>
            <dd>{publication.venue}</dd>
          </div>
          <div>
            <dt>Research Area</dt>
            <dd>{publication.theme}</dd>
          </div>
        </dl>

        <div className="paper-actions mono">
          {publication.url ? (
            <a
              className="paper-link"
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Paper (Springer) <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span>Paper Link Forthcoming</span>
          )}
        </div>
      </div>
    </article>
  );
};

export const PublicationsPage: React.FC = () => {
  const { publications } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<PublicationStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPublications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return publications.filter((pub) => {
      const matchesFilter = activeFilter === 'all' || pub.status === activeFilter;
      const haystack = [pub.title, pub.venue, pub.theme, pub.authors.join(' ')].join(' ').toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [publications, activeFilter, searchQuery]);

  return (
    <>
      <PageHeader
        className="publications-header"
        kicker="Publication"
        title={
          <>
            Research <em>Publications.</em>
          </>
        }
      >
        <p>
          Peer-reviewed scientific contributions published in top-ranked international venues, focusing on machine learning, neural computing, and algorithmic optimization.
        </p>
        <aside className="scholar-callout" aria-label="Springer publication profile">
          <span className="scholar-mark serif" aria-hidden="true">
            S
          </span>
          <div className="scholar-copy">
            <span className="mono">Springer Nature</span>
            <strong>Neural Computing and Applications (2025)</strong>
            <p>Accelerating model averaging with cluster-based approach using class occurrences.</p>
          </div>
          <a
            href="https://link.springer.com/article/10.1007/s00521-025-11289-0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Paper <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </PageHeader>

      <section className="editorial-section wrap publications-section" aria-label="Publication List">
        <div className="publication-explorer">
          <div className="publication-tools">
            <div className="filter-list" role="group" aria-label="Filter publications by status">
              {STATUS_FILTERS.map(([filterKey, filterLabel]) => (
                <button
                  key={filterKey}
                  type="button"
                  className={activeFilter === filterKey ? 'active' : ''}
                  aria-pressed={activeFilter === filterKey}
                  onClick={() => setActiveFilter(filterKey)}
                >
                  {filterLabel}
                </button>
              ))}
            </div>

            <label className="paper-search">
              <span className="sr-only">Search publications</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, author, venue…"
              />
            </label>
          </div>

          <p className="result-count mono" aria-live="polite">
            {filteredPublications.length} {filteredPublications.length === 1 ? 'paper' : 'papers'}
          </p>

          <div className="paper-list">
            {filteredPublications.length ? (
              filteredPublications.map((pub) => (
                <PublicationRow key={pub.title} publication={pub} />
              ))
            ) : (
              <p className="empty-state">No publications match this search.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
