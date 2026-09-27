import React from 'react';
import { ExperienceItem } from '../types/portfolio';
import { GlassWords } from './GlassWords';

interface TimelineListProps {
  items: ExperienceItem[];
}

export const TimelineList: React.FC<TimelineListProps> = ({ items }) => {
  return (
    <div className="timeline-list">
      {items.map((item) => (
        <article key={`${item.title}-${item.period}`} className="timeline-item">
          <div className="timeline-period mono">{item.period}</div>
          <div>
            <GlassWords as="h3">{item.title}</GlassWords>
            <GlassWords as="p" className="timeline-org">{item.organization}</GlassWords>
            {item.gpa ? (
              <strong className="gpa-highlight timeline-gpa">GPA {item.gpa}</strong>
            ) : null}
            <GlassWords as="p">{item.description}</GlassWords>
          </div>
        </article>
      ))}
    </div>
  );
};
