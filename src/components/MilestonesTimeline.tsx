import React, { useEffect, useRef } from 'react';
import { NewsItem } from '../types/portfolio';
import { GlassWords } from './GlassWords';

interface MilestonesTimelineProps {
  items: NewsItem[];
}

export const MilestonesTimeline: React.FC<MilestonesTimelineProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const entries = container.querySelectorAll<HTMLElement>('.milestone-entry');
    if (!entries.length) return;

    // Use IntersectionObserver to reveal events as user scrolls down, and reset when scrolled up
    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    entries.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <div className="milestones-timeline" ref={containerRef}>
      {items.map((item, idx) => (
        <div key={`${item.date}-${item.title}`} className="milestone-entry">
          <div className="milestone-spine">
            <div className="milestone-node" aria-hidden="true" />
            {idx < items.length - 1 ? <div className="milestone-line" aria-hidden="true" /> : null}
          </div>

          <div className="milestone-body">
            <div className="milestone-meta">
              <GlassWords as="time" className="mono milestone-date">{item.date}</GlassWords>
              {item.category && item.category !== 'Career Milestone' ? (
                <GlassWords as="span" className="mono milestone-category">{item.category}</GlassWords>
              ) : null}
            </div>
            <GlassWords as="h3" className="milestone-title">{item.title}</GlassWords>
            <GlassWords as="p" className="milestone-desc">{item.description}</GlassWords>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="milestone-link"
              >
                <span>Read Publication</span>
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
