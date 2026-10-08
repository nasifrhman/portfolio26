import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouteKey } from '../types/portfolio';
import { EMAIL, DISPLAY_NAME, SOCIAL_LINKS } from '../data/portfolioData';
import { GlassWords } from './GlassWords';

gsap.registerPlugin(ScrollTrigger);

// 25 deterministic, multi-directional scatter presets
// Bounded vertically so characters stay within footer area and never overlap upward into skills
const SCATTER_PRESETS = [
  // "Let's" (5 chars: L, e, t, ', s)
  { x: -380, y: -15,  rotate: -22, scale: 0.90, opacity: 0.70 }, // L: top-left high
  { x: -240, y: 30,   rotate: 18,  scale: 1.05, opacity: 0.70 }, // e: top-left deep
  { x: -90,  y: -10,  rotate: -14, scale: 0.92, opacity: 0.72 }, // t: top center-left
  { x: 80,   y: 25,   rotate: 24,  scale: 1.08, opacity: 0.70 }, // ': top center-right
  { x: 310,  y: -10,  rotate: -20, scale: 0.95, opacity: 0.72 }, // s: top-right diagonal

  // "Build" (5 chars: B, u, i, l, d)
  { x: -460, y: 60,   rotate: 22,  scale: 1.06, opacity: 0.65 }, // B: far left
  { x: -380, y: 140,  rotate: -16, scale: 0.92, opacity: 0.72 }, // u: bottom-left mid
  { x: -220, y: 220,  rotate: 20,  scale: 1.04, opacity: 0.74 }, // i: bottom-left deep
  { x: 360,  y: 40,   rotate: -22, scale: 0.88, opacity: 0.68 }, // l: top-right far
  { x: 470,  y: 90,   rotate: 16,  scale: 1.04, opacity: 0.65 }, // d: far right mid

  // "something" (9 chars: s, o, m, e, t, h, i, n, g)
  { x: -420, y: 170,  rotate: -28, scale: 0.94, opacity: 0.68 }, // s: bottom-left far
  { x: 200,  y: 15,   rotate: 15,  scale: 1.10, opacity: 0.72 }, // o: top right high
  { x: -140, y: 260,  rotate: -18, scale: 0.90, opacity: 0.75 }, // m: bottom center-left
  { x: 40,   y: 310,  rotate: 22,  scale: 1.02, opacity: 0.72 }, // e: bottom center deep
  { x: 200,  y: 280,  rotate: -20, scale: 0.94, opacity: 0.74 }, // t: bottom center-right
  { x: 360,  y: 210,  rotate: 16,  scale: 1.05, opacity: 0.70 }, // h: bottom-right far
  { x: 330,  y: 130,  rotate: -12, scale: 0.96, opacity: 0.75 }, // i: right mid-down
  { x: -320, y: 80,   rotate: 20,  scale: 1.06, opacity: 0.70 }, // n: left mid-down
  { x: 430,  y: 110,  rotate: -24, scale: 0.92, opacity: 0.68 }, // g: far right diagonal

  // "Great." (6 chars: G, r, e, a, t, .)
  { x: -300, y: 240,  rotate: -20, scale: 1.08, opacity: 0.72 }, // G: bottom-left deep
  { x: -60,  y: 320,  rotate: 14,  scale: 0.95, opacity: 0.74 }, // r: bottom direct
  { x: 130,  y: 30,   rotate: -16, scale: 1.04, opacity: 0.72 }, // e: top direct
  { x: 120,  y: 310,  rotate: 20,  scale: 0.92, opacity: 0.72 }, // a: bottom direct-right
  { x: 330,  y: 260,  rotate: -24, scale: 1.05, opacity: 0.70 }, // t: bottom-right deep
  { x: 460,  y: 200,  rotate: 26,  scale: 1.12, opacity: 0.65 }, // .: far right bottom
];

interface FooterProps {
  activeRoute?: RouteKey;
  isHome?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ activeRoute, isHome = false }) => {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Independent intersection observers:
  // - actionsRef triggers when buttons enter viewport
  // - bottomRef triggers when social links & bottom bar enter viewport
  useEffect(() => {
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
        threshold: 0.05,
        rootMargin: '0px 0px -15px 0px'
      }
    );

    if (actionsRef.current) observer.observe(actionsRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [activeRoute, isHome]);

  // GSAP scroll-driven kinetic typography assembly for "Let's Build something Great."
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const letters = footerEl.querySelectorAll<HTMLElement>('.scatter-letter');
    if (!letters.length) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    const ctx = gsap.context(() => {
      // Dynamic responsiveness: scale scatter distance according to screen width
      const getFactor = () => Math.min(1, Math.max(0.35, window.innerWidth / 1150));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: 'top 92%',
          end: 'top 24%',
          scrub: 1.8,
          invalidateOnRefresh: true
        }
      });

      // All letters animate together simultaneously:
      letters.forEach((el, index) => {
        const cfg = SCATTER_PRESETS[index % SCATTER_PRESETS.length];

        tl.fromTo(
          el,
          {
            x: () => cfg.x * getFactor(),
            y: () => cfg.y * getFactor(),
            rotation: cfg.rotate,
            scale: cfg.scale,
            opacity: cfg.opacity,
            force3D: true
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            force3D: true
          },
          0
        );
      });
    }, footerEl);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeRoute, isHome]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Filter out Springer Paper specifically for the footer section (LinkedIn, GitHub, WhatsApp)
  const footerSocialLinks = SOCIAL_LINKS.filter(
    ([label]) => !label.toLowerCase().includes('springer')
  );

  return (
    <>
      {/* Architectural Footer (Present across all pages) */}
      <footer ref={footerRef} className="architectural-footer" aria-labelledby="footer-cta-title">
        <div className="wrap footer-cta-content">
          <GlassWords as="h2" id="footer-cta-title" className="footer-headline" scatter>
            Let's Build <br className="hidden-mobile" />
            <span className="footer-serif-accent">something</span> <br />
            Great.
          </GlassWords>

          <div ref={actionsRef} className="footer-actions">
            <a
              href={`mailto:${EMAIL}`}
              className="footer-btn footer-btn-primary footer-anim-left"
            >
              <span>Send Email Directly</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="footer-btn footer-btn-secondary footer-anim-right"
              aria-label="Copy email address"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          <div ref={bottomRef} className="footer-bottom-section">
            <div className="footer-social-row footer-anim-fade">
              {footerSocialLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link group"
                >
                  <span>{label}</span>
                  <ArrowUpRight size={14} className="social-arrow" />
                </a>
              ))}
            </div>

            <div className="footer-bottom-bar mono footer-anim-fade">
              <GlassWords as="span">© 2026 {DISPLAY_NAME.toUpperCase()} • ALL RIGHTS RESERVED</GlassWords>
              <GlassWords as="span" className="footer-location-tag">DHAKA, BANGLADESH · UTC+6</GlassWords>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
