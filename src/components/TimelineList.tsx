import React from 'react';
import { ExperienceItem } from '../types/portfolio';

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
            <h3>{item.title}</h3>
            <p className="timeline-org">{item.organization}</p>
            {item.gpa ? (
              <strong className="gpa-highlight timeline-gpa">GPA {item.gpa}</strong>
            ) : null}
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
};
