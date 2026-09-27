import React from 'react';
import { ContactRibbon } from './ContactRibbon';
import { MilestonesTimeline } from './MilestonesTimeline';
import { GlassWords } from './GlassWords';
import {
  AVATAR_URL,
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
            <GlassWords as="p" className="kicker">About Me</GlassWords>

            <GlassWords as="h1" id="home-title" className="hero-headline">
              About <span className="hero-serif-contrast">Me.</span>
            </GlassWords>

            <GlassWords as="p" className="hero-lead-thesis serif">
              I build reliable digital solutions and backend architectures—engineered for <em>performance</em>, scalable in <em>production.</em>
            </GlassWords>

            <div className="hero-lede">
              <GlassWords as="p">
                Hi, I’m <strong>Md. Nasifur Rahman</strong>, a dedicated software professional with a strong background in computer science and real-world industry experience. I completed my BSc in Computer Science &amp; Engineering from{' '}
                <span className="highlight">American International University–Bangladesh</span> (2024), where I also worked as a Research Assistant and published my research paper in a top-ranked international journal.
              </GlassWords>
              <GlassWords as="p">
                Currently, I work at <span className="highlight">Sparktech Agency</span> as a Back-End Developer, collaborating with international clients to design and deliver reliable, modern digital solutions, high-throughput APIs, and secure backend systems. I enjoy learning new technologies, solving real problems, and creating products that add substantial value to both businesses and users.
              </GlassWords>
            </div>
          </div>

          <aside className="hero-profile" aria-label="Profile card">
            <div className="dp-profile-card">
              <div className="dp-image-container">
                <img
                  src={AVATAR_URL}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://avatars.githubusercontent.com/u/113826897?v=4';
                  }}
                  alt="Portrait of Md. Nasifur Rahman"
                  width="360"
                  height="450"
                />
                <div className="dp-floating-badge">
                  <span className="dp-badge-name mono">Md. Nasifur Rahman</span>
                  <span className="dp-badge-title">Software Engineer · Back-End Developer</span>
                </div>
              </div>

              <div className="dp-meta-ledger mono">
                <div className="dp-meta-row">
                  <span className="dp-meta-key">Experience</span>
                  <span className="dp-meta-val">Sparktech Agency</span>
                </div>
                <div className="dp-meta-row">
                  <span className="dp-meta-key">Location</span>
                  <span className="dp-meta-val">Dhaka (UTC+6)</span>
                </div>
                <div className="dp-meta-row">
                  <span className="dp-meta-key">Publication</span>
                  <span className="dp-meta-val accent-text">Springer Q1 Paper</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <ContactRibbon className="hero-contacts" />

        <section className="hero-education" aria-labelledby="home-education-title">
          <div className="hero-education-label">
            <GlassWords as="p" className="kicker">Education</GlassWords>
            <GlassWords as="h2" id="home-education-title">Academic foundation.</GlassWords>
          </div>
          <div className="hero-education-list">
            {EDUCATION_DATA.map((item) => (
              <article key={item.title}>
                <p className="mono">{item.period}</p>
                <GlassWords as="h3">{item.title}</GlassWords>
                <GlassWords as="p" className="hero-education-org">{item.organization}</GlassWords>
                <GlassWords as="p" style={{ marginTop: '0.5rem', color: 'var(--mid)', fontSize: '14px' }}>
                  {item.description}
                </GlassWords>
              </article>
            ))}
          </div>
        </section>

        <nav className="hero-explore" aria-labelledby="explore-title">
          <div className="hero-explore-heading">
            <GlassWords as="p" className="kicker">Continue exploring</GlassWords>
            <GlassWords as="h2" id="explore-title">See the work in detail.</GlassWords>
          </div>
          <div className="hero-explore-links">
            {EXPLORE_CARDS.map(([route, title, desc]) => (
              <a key={route} href={`#${route}`}>
                <GlassWords as="span" className="serif">{title}</GlassWords>
                <GlassWords as="small">{desc}</GlassWords>
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
            <GlassWords as="p" className="kicker">Skills &amp; Technologies</GlassWords>
            <GlassWords as="h2" id="skills-title">What I carry into the work.</GlassWords>
          </div>
        </div>
        <div className="skills-ledger">
          {SKILLS_DATA.map((skill) => (
            <article key={skill.title} className="skill-card">
              <div className="skill-card-header">
                <GlassWords as="h3">{skill.title}</GlassWords>
              </div>
              <div className="skill-tag-cloud">
                {skill.description.split(',').map((tech) => (
                  <span key={tech.trim()} className="skill-pill mono word-glass">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial-section milestones-section wrap" aria-labelledby="milestones-timeline-title">
        <div className="section-heading compact">
          <div>
            <GlassWords as="p" className="kicker">Timeline</GlassWords>
            <GlassWords as="h2" id="milestones-timeline-title">
              Career &amp; Research <span className="hero-serif-contrast">Milestones.</span>
            </GlassWords>
          </div>
        </div>

        <MilestonesTimeline items={NEWS_DATA} />
      </section>
    </>
  );
};
