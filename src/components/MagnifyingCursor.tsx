import React, { useEffect, useState, useRef } from 'react';

interface LetterBounds {
  el: HTMLElement;
  left: number;
  right: number;
  cx: number;
  cy: number;
  height: number;
}

export const MagnifyingCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -200, y: -200 });
  const lensPos = useRef({ x: -200, y: -200 });
  const lensRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Cached letter bounding coordinates
  const cachedLetters = useRef<LetterBounds[]>([]);
  const activeLetters = useRef<Set<HTMLElement>>(new Set());
  const isInsideActiveSection = useRef(false);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), not touchscreens
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setEnabled(true);

    let lastHoveredEntry: HTMLElement | null = null;

    const resetActiveLetters = () => {
      activeLetters.current.forEach((el) => {
        el.style.transform = '';
        el.style.zIndex = '';
        el.classList.remove('is-center-letter');
      });
      activeLetters.current.clear();
    };

    const updateLettersCache = () => {
      resetActiveLetters();
      const letterElements = document.querySelectorAll<HTMLElement>(
        '.hero-copy .mag-letter, .milestones-section .mag-letter, .architectural-footer .mag-letter'
      );
      const list: LetterBounds[] = [];
      letterElements.forEach((el) => {
        // Exclude any elements inside links or interactive buttons
        if (el.closest('.milestone-link, .footer-btn, .footer-social-link, a, button')) return;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          list.push({
            el,
            left: r.left,
            right: r.right,
            cx: r.left + r.width / 2,
            cy: r.top + r.height / 2,
            height: r.height
          });
        }
      });
      cachedLetters.current = list;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (!target) {
        if (isVisible) setIsVisible(false);
        resetActiveLetters();
        lastHoveredEntry = null;
        return;
      }

      // 1. Check if inside Header / Navbar -> simple cursor, no magnifying glass
      const inHeader = Boolean(target.closest('.site-header, .navbar, header'));

      // 2. Check if inside Academic Foundation or Work Details -> hand cursor, no magnifying glass
      const inAcademicOrWork = Boolean(
        target.closest('.hero-education, .hero-explore')
      );

      // 3. Check if inside link part of milestones section -> hand cursor, no magnifying glass ("without the link part")
      const inMilestoneLink = Boolean(target.closest('.milestone-link'));

      // 4. Check if inside footer interactive elements (buttons, social links) -> hand cursor, no magnifying glass
      const inFooterInteractive = Boolean(
        target.closest('.footer-actions, .footer-social-row, .footer-btn, .footer-social-link')
      );

      // 5. Check if inside Hero section (.home-hero .hero-grid)
      const inHeroGrid = Boolean(
        target.closest('.home-hero .hero-grid') && !inHeader && !inAcademicOrWork
      );

      // 6. Check if inside Career & Research Milestones section (.milestones-section or .milestones-timeline)
      const inMilestones = Boolean(
        target.closest('.milestones-section, .milestones-timeline') && !inMilestoneLink
      );

      // 7. Check if inside Architectural Footer ("Let's Build something Great." section)
      const inArchitecturalFooter = Boolean(
        target.closest('.architectural-footer') && !inFooterInteractive
      );

      const isActive =
        (inHeroGrid || inMilestones || inArchitecturalFooter) &&
        !inHeader &&
        !inAcademicOrWork &&
        !inMilestoneLink &&
        !inFooterInteractive;

      if (isActive) {
        if (!isVisible) setIsVisible(true);
        if (!isInsideActiveSection.current) {
          updateLettersCache();
        }
        const currentEntry = target.closest<HTMLElement>('.milestone-entry');
        if (currentEntry && currentEntry !== lastHoveredEntry) {
          lastHoveredEntry = currentEntry;
          updateLettersCache();
        }
      } else {
        if (isVisible) setIsVisible(false);
        resetActiveLetters();
        lastHoveredEntry = null;
      }

      isInsideActiveSection.current = isActive;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      isInsideActiveSection.current = false;
      resetActiveLetters();
    };

    const handleScroll = () => {
      updateLettersCache();
    };

    const handleResize = () => {
      updateLettersCache();
    };

    // Initial cache
    updateLettersCache();
    const timer = setTimeout(updateLettersCache, 400);

    // Animation loop: tracks lens position and calculates character-level wave magnification
    const render = () => {
      // Smooth lerp follow for magnifying glass
      const lerp = 0.28;
      lensPos.current.x += (mousePos.current.x - lensPos.current.x) * lerp;
      lensPos.current.y += (mousePos.current.y - lensPos.current.y) * lerp;

      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${lensPos.current.x}px, ${lensPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Character-level optical wave magnification:
      // Center letter is BIG, adjacent letters are LITTLE BIG to shape a smooth wave.
      // Zero line break, zero overlap, strictly on the active line.
      if (isInsideActiveSection.current && cachedLetters.current.length > 0) {
        const curX = mousePos.current.x;
        const curY = mousePos.current.y;
        const currentlyNear = new Set<HTMLElement>();

        for (let i = 0; i < cachedLetters.current.length; i++) {
          const item = cachedLetters.current[i];

          // 1. Strict vertical constraint: NEVER affect other lines!
          // Mouse must be vertically on this exact line
          const halfH = item.height / 2 + 3;
          if (Math.abs(curY - item.cy) > halfH) {
            continue; // Different line -> skip immediately!
          }

          // Optical wave radius adapts proportionally:
          // 48px for standard text (~20-30px height), expands up to ~135px for giant headline text (~100px height)
          const waveRadius = Math.max(48, item.height * 1.35);

          // 2. Horizontal distance from cursor to center of character
          const dx = item.cx - curX;
          const distX = Math.abs(dx);

          if (distX < waveRadius) {
            // Cosine bell curve wave (1 at center, smoothly tapering to 0 at edge)
            const factor = Math.cos((distX / waveRadius) * (Math.PI / 2));

            // Giant letters (e.g. 100px footer headline) vs standard letters (hero / milestones)
            const isGiant = item.height > 45;
            const maxScaleBoost = isGiant ? 0.42 : 0.65;
            const maxLift = isGiant ? 14 : 6.5;
            const maxParting = isGiant ? 12 : 4.8;

            const scale = 1 + maxScaleBoost * factor;
            const translateY = -maxLift * factor;
            const sign = dx > 0 ? 1 : (dx < 0 ? -1 : 0);
            const translateX = sign * maxParting * Math.sin(factor * Math.PI);

            item.el.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
            item.el.style.zIndex = Math.round(5 + factor * 15).toString();

            if (factor > 0.8) {
              item.el.classList.add('is-center-letter');
            } else {
              item.el.classList.remove('is-center-letter');
            }

            currentlyNear.add(item.el);
            activeLetters.current.add(item.el);
          }
        }

        // Reset letters that moved outside wave influence
        activeLetters.current.forEach((el) => {
          if (!currentlyNear.has(el)) {
            el.style.transform = '';
            el.style.zIndex = '';
            el.classList.remove('is-center-letter');
            activeLetters.current.delete(el);
          }
        });
      } else if (activeLetters.current.size > 0) {
        resetActiveLetters();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resetActiveLetters();
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <div
      ref={lensRef}
      className={`magnifying-glass ${isClicking ? 'is-clicking' : ''} ${
        isVisible ? 'is-visible' : ''
      }`}
      aria-hidden="true"
    >
      <div className="magnifying-lens-rim">
        <div className="magnifying-lens-glare" />
        <div className="magnifying-handle-stem" />
        <div className="magnifying-handle-grip" />
      </div>
    </div>
  );
};
