import React from 'react';
import { ContactRibbon } from './ContactRibbon';
import {
  AVATAR_URL,
  GMAIL_COMPOSE_URL,
  EDUCATION_DATA,
  EXPLORE_CARDS,
  SKILLS_DATA,
  NEWS_DATA
} from '../data/portfolioData';

export const Home: React.FC = () => {
  return (
    <>
      <section className="home-hero wrap" aria-labelledby="home-title">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">Software Engineer · Back-End Developer · Researcher</p>
            <h1 id="home-title">
              I build reliable digital solutions and backend architectures—engineered for{' '}
              <em>performance</em>, scalable in <em>production.</em>
            </h1>
            <div className="hero-lede">
              <p>
                Hi, I’m <strong>Md. Nasifur Rahman</strong>, a dedicated software professional with a strong background in computer science and real-world industry experience. I completed my BSc in Computer Science & Engineering from{' '}
                <span className="highlight">American International University–Bangladesh</span> (2024), where I also worked as a Research Assistant and published my research paper in a top-ranked international journal.
              </p>
              <p>
                Currently, I work at <span className="highlight">Sparktech Agency</span> as a Back-End Developer, collaborating with international clients to design and deliver reliable, modern digital solutions, high-throughput APIs, and secure backend systems. I enjoy learning new technologies, solving real problems, and creating products that add substantial value to both businesses and users.
              </p>
            </div>
          </div>

          <aside className="hero-profile" aria-label="Portrait">
            <div className="portrait-frame">
              <img
                src={AVATAR_URL}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/113826897?v=4';
                }}
                alt="Portrait of Md. Nasifur Rahman"
                width="540"
                height="675"
              />
            </div>
            <p className="portrait-caption mono">Dhaka, Bangladesh</p>
          </aside>
        </div>

        <ContactRibbon className="hero-contacts" />

        <section className="hero-education" aria-labelledby="home-education-title">
          <div className="hero-education-label">
            <p className="kicker">Education</p>
            <h2 id="home-education-title">Academic foundation.</h2>
          </div>
          <div className="hero-education-list">
            {EDUCATION_DATA.map((item) => (
              <article key={item.title}>
                <p className="mono">{item.period}</p>
                <h3>{item.title}</h3>
                <p className="hero-education-org">{item.organization}</p>
                <p style={{ marginTop: '0.5rem', color: 'var(--mid)', fontSize: '14px' }}>
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <nav className="hero-explore" aria-labelledby="explore-title">
          <div className="hero-explore-heading">
            <p className="kicker">Continue exploring</p>
            <h2 id="explore-title">See the work in detail.</h2>
          </div>
          <div className="hero-explore-links">
            {EXPLORE_CARDS.map(([route, title, desc]) => (
              <a key={route} href={`#${route}`}>
                <span className="serif">{title}</span>
                <small>{desc}</small>
                <span className="mono" aria-hidden="true">
                  Explore ↗
                </span>
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="editorial-section wrap" aria-labelledby="skills-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ 01 · Skills</p>
            <h2 id="skills-title">What I carry into the work.</h2>
          </div>
        </div>
        <div className="skills-ledger">
          {SKILLS_DATA.map((skill) => (
            <article key={skill.title}>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section wrap" aria-labelledby="current-title">
        <div className="section-heading compact">
          <div>
            <p className="kicker">§ 02 · Recent news</p>
            <h2 id="current-title">What is moving now.</h2>
          </div>
        </div>
        <div className="dispatch-list">
          {NEWS_DATA.slice(0, 5).map((item) => (
            <article key={`${item.date}-${item.title}`}>
              <time className="mono">{item.date}</time>
              <div className="dispatch-content">
                <span className="news-category mono">{item.category}</span>
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
        <a className="section-link" href="#news">
          See all news <span aria-hidden="true">→</span>
        </a>
      </section>

      <section className="home-contact wrap">
        <p className="kicker">Backend Engineering · Applied AI · Digital Solutions</p>
        <h2>
          Have a project where <em>reliability</em>, scale, and clean architecture matter?
        </h2>
        <a
          className="primary-link"
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
};
