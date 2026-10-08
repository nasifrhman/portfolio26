import React, { useEffect, useRef } from 'react';
import { MilestonesTimeline } from './MilestonesTimeline';
import { GlassWords } from './GlassWords';
import { ActivitySection } from './ActivitySection';
import { SkillsSphere } from './SkillsConvergence';
import {
  AVATAR_URL,
  EDUCATION_DATA,
  EXPLORE_CARDS,
  NEWS_DATA,
  EMAIL,
  NAME
} from '../data/portfolioData';

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const exploreRef = useRef<HTMLElement>(null);
  const milestonesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Observer for scroll-slide-left sections: Academic foundation, Explore, Milestones
    // Reveals when scrolling into view, and resets when scrolling away/up
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    if (educationRef.current) observer.observe(educationRef.current);
    if (exploreRef.current) observer.observe(exploreRef.current);
    if (milestonesRef.current) observer.observe(milestonesRef.current);

    // Observer for Hero Section: resets when scrolling down past it, replays when scrolling back up
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-is-revealed');
          } else {
            entry.target.classList.remove('hero-is-revealed');
          }
        });
      },
      {
        threshold: 0.08
      }
    );

    if (heroRef.current) heroObserver.observe(heroRef.current);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <div className="wrap home-content content-width">
      {/* 2-Column Hero Section */}
      <section
        ref={heroRef}
        className="hero-section hero-is-revealed"
        aria-labelledby="hero-title"
      >
        {/* Modern Ethereal Ambient Illumination Mesh */}
        <div className="hero-ambient-mesh hero-anim-mesh" aria-hidden="true" />

        <div className="hero-two-col-grid">
          {/* Left Column: Bio & Identity */}
          <div className="hero-left-col">
            <div className="hero-avatar-wrap hero-anim-avatar">
              <div className="hero-avatar-halo" aria-hidden="true" />
              <img
                alt={NAME}
                loading="lazy"
                width={128}
                height={128}
                decoding="async"
                className="h-32 w-32 rounded-full object-cover border-2 border-[var(--rule)] ring-4 ring-[var(--accent-wash)] shadow-2xl transition-transform hover:scale-105 duration-300 relative z-10"
                src={AVATAR_URL}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://avatars.githubusercontent.com/u/113826897?v=4';
                }}
              />
            </div>

            <h1
              id="hero-title"
              className="mt-7 text-4xl font-semibold tracking-tight sm:text-5xl hero-anim-name"
            >
              {NAME}
            </h1>

            <p className="mt-5 text-xl leading-8 text-muted hero-anim-role">
              Software Engineer
            </p>

            <div className="article-text mt-8 max-w-3xl hero-bio-text">
              <p className="hero-anim-bio-1">
                I build reliable backend systems and clean APIs that don't break when
                real users show up. My experience spans high-throughput APIs,
                distributed microservices, cloud infrastructure, AI/ML research, and
                production web applications.
              </p>
              <p className="mt-4 hero-anim-bio-2">
                My go-to stack includes Node.js (sometimes Bun), TypeScript, Express.js,
                PostgreSQL, MongoDB, Redis, and Docker, backed by solid system design.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5 text-muted hero-anim-links">
              <a
                href="https://github.com/nasifrhman"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github"
                  aria-hidden="true"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nasifrhman/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>

              <a
                href="https://wa.me/1798552909"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-message-square"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span className="sr-only">WhatsApp</span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-ink transition-colors"
                aria-label={`Email ${NAME}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                  aria-hidden="true"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <span className="sr-only">Email {NAME}</span>
              </a>

              <a
                href="https://link.springer.com/article/10.1007/s00521-025-11289-0"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-sm underline-offset-4 hover:text-ink hover:underline"
              >
                springer paper
              </a>

              <a
                href="#contacts"
                className="mono text-sm underline-offset-4 hover:text-ink hover:underline"
              >
                resume
              </a>
            </div>
          </div>

          {/* Right Column: Pure 3D Interactive Skill Ball on Desktop only (No Text) */}
          <div className="hero-right-col hero-anim-ball" aria-label="Interactive 3D Skill Ball">
            <SkillsSphere compact={true} />
          </div>
        </div>
      </section>

      {/* Main Flow Wrapper */}
      <div className="flex w-full max-w-full flex-col gap-12 sm:gap-16 md:gap-20">
        {/* Devendra Jat 1:1 Activity Section */}
        <ActivitySection />

        {/* Academic Foundation / Education */}
        <section
          ref={educationRef}
          className="hero-education scroll-slide-left-section"
          aria-labelledby="home-education-title"
        >
          <div className="hero-education-label scroll-slide-left-item">
            <GlassWords as="p" className="kicker">Education</GlassWords>
            <GlassWords as="h2" id="home-education-title">Academic foundation.</GlassWords>
          </div>
          <div className="hero-education-list">
            {EDUCATION_DATA.map((item) => (
              <article key={item.title} className="scroll-slide-left-item">
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

        {/* Continue Exploring Links */}
        <nav
          ref={exploreRef}
          className="hero-explore scroll-slide-left-section"
          aria-labelledby="explore-title"
        >
          <div className="hero-explore-heading scroll-slide-left-item">
            <GlassWords as="p" className="kicker">Continue exploring</GlassWords>
            <GlassWords as="h2" id="explore-title">See the work in detail.</GlassWords>
          </div>
          <div className="hero-explore-links">
            {EXPLORE_CARDS.map(([route, title, desc]) => (
              <a key={route} href={`#${route}`} className="scroll-slide-left-item">
                <GlassWords as="span" className="serif">{title}</GlassWords>
                <GlassWords as="small">{desc}</GlassWords>
                <span className="mono" aria-hidden="true">
                  Explore ↗
                </span>
              </a>
            ))}
          </div>
        </nav>

        {/* Milestones Timeline */}
        <section
          ref={milestonesRef}
          className="editorial-section milestones-section scroll-slide-left-section"
          aria-labelledby="milestones-timeline-title"
        >
          <div className="section-heading compact scroll-slide-left-item">
            <div>
              <GlassWords as="p" className="kicker">Timeline</GlassWords>
              <GlassWords as="h2" id="milestones-timeline-title">
                Career &amp; Research <span className="hero-serif-contrast">Milestones.</span>
              </GlassWords>
            </div>
          </div>

          <MilestonesTimeline items={NEWS_DATA} />
        </section>

        {/* Mobile View: Show Skill Ball after Career & Research Milestones section with title */}
        <section
          className="editorial-section mobile-skills-section"
          aria-labelledby="mobile-skills-heading"
        >
          <div className="section-heading compact">
            <div>
              <GlassWords as="p" className="kicker">Core Stack</GlassWords>
              <GlassWords as="h2" id="mobile-skills-heading">
                Technical <span className="hero-serif-contrast">Skills Sphere.</span>
              </GlassWords>
              <GlassWords as="p" className="mobile-skills-subtitle">
                Interactive 3D technology matrix · Drag or swipe to explore
              </GlassWords>
            </div>
          </div>

          <div className="mobile-skills-ball-wrap">
            <SkillsSphere compact={true} />
          </div>
        </section>
      </div>
    </div>
  );
};
