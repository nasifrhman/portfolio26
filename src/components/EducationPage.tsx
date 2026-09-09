import React from 'react';
import { TimelineList } from './TimelineList';
import { EDUCATION_DATA, HONORS_DATA } from '../data/portfolioData';

export const EducationPage: React.FC = () => {
  return (
    <>
      <section className="editorial-section wrap" aria-labelledby="education-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ Education</p>
            <h1 id="education-title">Academic Background</h1>
          </div>
        </div>
        <TimelineList items={EDUCATION_DATA} />
      </section>

      <section className="editorial-section wrap" aria-labelledby="honors-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ Honors and recognition</p>
            <h2 id="honors-title">Recognition Along the Way</h2>
          </div>
        </div>
        <div className="honor-list">
          {HONORS_DATA.map((honor) => (
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
