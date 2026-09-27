import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillItem {
  name: string;
  color: string;
  icon: React.ReactNode;
}

export const SKILL_ITEMS: SkillItem[] = [
  {
    name: 'TypeScript',
    color: '#3178c6',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect width="24" height="24" rx="5" fill="#3178c6" />
        <path d="M12.5 13.5v-1.8h7v1.8h-2.3v6.5h-2.4v-6.5h-2.3zm-6.2 3.6c.7.4 1.4.7 2.2.7.8 0 1.3-.3 1.3-.8 0-.5-.4-.7-1.4-1.1-1.3-.4-2.2-.9-2.2-2.1 0-1.2 1-2.1 2.6-2.1 1 0 1.8.3 2.4.6l-.6 1.7c-.5-.3-1.1-.5-1.8-.5-.7 0-1.1.3-1.1.7 0 .5.4.7 1.4 1 1.4.5 2.2 1 2.2 2.2 0 1.3-1 2.2-2.8 2.2-1.1 0-2.1-.4-2.8-.8l.7-1.8z" fill="#ffffff" />
      </svg>
    )
  },
  {
    name: 'JavaScript',
    color: '#f7df1e',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <rect width="24" height="24" rx="5" fill="#f7df1e" />
        <path d="M6.2 16.6l1.8-1.1c.4.7.8 1.2 1.5 1.2.7 0 1.1-.3 1.1-.9v-5.2h2.2v5.2c0 2-1.2 3-3.2 3-1.6 0-2.6-.8-3.4-2.2zm7.6-.1l1.8-1.1c.5.8 1.1 1.3 2.1 1.3.8 0 1.4-.4 1.4-1 0-.7-.6-1-1.7-1.4l-.6-.2c-1.7-.7-2.8-1.5-2.8-3.3 0-1.7 1.3-3 3.3-3 1.5 0 2.6.5 3.3 1.8l-1.7 1.1c-.4-.7-.8-1-1.6-1-.7 0-1.2.4-1.2.9 0 .6.5.9 1.4 1.3l.6.2c2 .8 3.1 1.6 3.1 3.5 0 2-1.5 3.1-3.6 3.1-2 0-3.3-.9-4.2-2.3z" fill="#000000" />
      </svg>
    )
  },
  {
    name: 'React.js',
    color: '#61dafb',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#61dafb" strokeWidth="1.8">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2.2" fill="#61dafb" stroke="none" />
      </svg>
    )
  },
  {
    name: 'Next.js',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000000" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M16.5 7.5v9M8.5 7.5v9l7.8-8.9" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    color: '#539e43',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#539e43">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.31L5.34 8.15v7.7L12 19.69l6.66-3.84v-7.7L12 4.31z" />
        <path d="M11 8h2v8h-2z" fill="#ffffff" />
      </svg>
    )
  },
  {
    name: 'Express.js',
    color: '#60a5fa',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
        <rect width="24" height="24" rx="5" fill="#181d29" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="3" y="16.5" fontFamily="monospace" fontSize="11.5" fontWeight="bold" fill="#ffffff">ex</text>
        <circle cx="18.5" cy="12" r="2.5" fill="#60a5fa" />
      </svg>
    )
  },
  {
    name: 'Python',
    color: '#3776ab',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M11.9 2c-3.1 0-4.9 1.4-4.9 3.2v2.4h5v.8H4.6C2.8 8.4 2 10.3 2 12.3c0 2.2 1.3 3.6 3.6 3.6h1.4v-1.8c0-1.9 1.6-3.6 3.6-3.6h5c1.6 0 2.9-1.3 2.9-2.9V5.2C18.5 3.4 15 2 11.9 2zm-1.4 1.7a1 1 0 110 2 1 1 0 010-2z" fill="#3776ab" />
        <path d="M12.1 22c3.1 0 4.9-1.4 4.9-3.2v-2.4h-5v-.8h7.4c1.8 0 2.6-1.9 2.6-3.9 0-2.2-1.3-3.6-3.6-3.6H17v1.8c0 1.9-1.6 3.6-3.6 3.6h-5c-1.6 0-2.9 1.3-2.9 2.9v2.4C5.5 20.6 9 22 12.1 22zm1.4-1.7a1 1 0 110-2 1 1 0 010 2z" fill="#ffd43b" />
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    color: '#336791',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    name: 'MongoDB',
    color: '#47a248',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#47a248">
        <path d="M12 2C11.5 3.5 8 9 8 13.5c0 3.5 2.2 6.5 4 7.5 1.8-1 4-4 4-7.5C16 9 12.5 3.5 12 2zm0 18.5c-.3-.2-3-2.5-3-7 0-3.3 2.2-7.2 3-8.5.8 1.3 3 5.2 3 8.5 0 4.5-2.7 6.8-3 7z" />
      </svg>
    )
  },
  {
    name: 'Redis',
    color: '#dc382d',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#dc382d">
        <path d="M12 3L2 8l10 5 10-5-10-5zm0 8l-8.5-4.25L12 4.5l8.5 2.25L12 11zm10 2.5L12 18.5 2 13.5v3l10 5 10-5v-3zm0-3L12 15.5 2 10.5v3l10 5 10-5v-3z" />
      </svg>
    )
  },
  {
    name: 'Docker',
    color: '#2496ed',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#2496ed">
        <path d="M2.5 13.5c.3 2.7 2.3 5.4 6 5.4 5.3 0 8.5-3.3 9.4-7.5.8 0 2.1-.2 2.6-1.1-.6-.4-1.4-.4-1.9-.3.4-.7.6-1.6.4-2.5-.7.1-1.5.5-1.9 1.1C16 7.2 14.1 6.5 12 6.5c-.3 0-.6 0-.9.1V6h-2v2.5H7.2V6H5.3v2.5H3.5v2h5.6v2H2.5v1zm4.6-5h1.9v1.9H7.1V8.5zm2.8 0h1.9v1.9H9.9V8.5zm-5.6 3.8h1.9v1.9H4.3v-1.9zm2.8 0H9v1.9H7.1v-1.9zm2.8 0h1.9v1.9H9.9v-1.9zm2.8-3.8h1.9v1.9h-1.9V8.5zm0 3.8h1.9v1.9h-1.9v-1.9z" />
      </svg>
    )
  },
  {
    name: 'AWS',
    color: '#ff9900',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#ff9900">
        <path d="M18.8 16.5c-2.4 1.8-5.8 2.7-8.8 2.7-4.2 0-8-1.5-10.9-4-.2-.2-.1-.5.2-.4 3.1 1.8 6.9 2.8 10.7 2.8 2.7 0 5.6-.7 8.2-2.1.4-.2.8.2.6.5zm1.5-1.2c-.3-.4-1.8-.2-2.8 0-.3 0-.3-.3 0-.5 1.7-1.2 4.5-.8 4.8-.4.3.4-.1 3.2-1.8 4.6-.3.2-.5.1-.4-.2.4-.9.5-3.1.2-3.5zM6.5 10.2c0-1.4.9-2.5 2.5-2.5 1 0 1.8.4 2.2.8v3.5c-.5.4-1.3.7-2.2.7-1.6 0-2.5-1.1-2.5-2.5zm4.7 4.9V8.2c-.7-.5-1.7-.8-2.8-.8-2.6 0-4.3 1.8-4.3 4.4 0 2.7 1.7 4.4 4.3 4.4 1.1 0 2-.3 2.8-.8v-.3z" />
      </svg>
    )
  },
  {
    name: 'Git',
    color: '#f05032',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#f05032">
        <path d="M21.6 10.7l-8.3-8.3c-.8-.8-2.1-.8-2.9 0L8.7 4.1l3.3 3.3c.7-.2 1.6 0 2.2.6.6.6.8 1.5.6 2.2l3.2 3.2c.7-.2 1.6 0 2.2.6.9.9.9 2.3 0 3.2s-2.3.9-3.2 0c-.7-.7-.9-1.7-.5-2.5l-3-3v4.6c.4.3.7.8.7 1.4 0 1.1-.9 2-2 2s-2-.9-2-2c0-.7.4-1.3 1-1.6V8.6c-.6-.3-1-.9-1-1.6 0-.6.3-1.2.8-1.5L2.4 10.7c-.8.8-.8 2.1 0 2.9l8.3 8.3c.8.8 2.1.8 2.9 0l8-8c.8-.8.8-2.1 0-2.9z" />
      </svg>
    )
  },
  {
    name: 'Linux',
    color: '#fcc624',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#fcc624">
        <path d="M12 2C9.5 2 8 3.8 8 6.5c0 1.2.3 2.4.8 3.5C7.2 11.2 6 13.5 6 16c0 3.3 2.7 6 6 6s6-2.7 6-6c0-2.5-1.2-4.8-2.8-6C15.7 8.9 16 7.7 16 6.5 16 3.8 14.5 2 12 2zm-1.5 4c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm3 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-1.5 2.5c.8 0 1.5.3 1.5.8s-.7.8-1.5.8-1.5-.3-1.5-.8.7-.8 1.5-.8z" />
      </svg>
    )
  },
  {
    name: 'Nginx',
    color: '#009639',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#009639">
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm-3.5 13.5V8.5h1.8l3.4 5.2V8.5h1.8v7h-1.8l-3.4-5.2v5.2H8.5z" />
      </svg>
    )
  },
  {
    name: 'C++',
    color: '#00599c',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#00599c">
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm-1.5 12.8c-2 0-3.3-1.4-3.3-3.3s1.3-3.3 3.3-3.3c1.2 0 2.2.6 2.7 1.5l-1.5.9c-.3-.5-.7-.8-1.2-.8-1.1 0-1.8.8-1.8 1.7s.7 1.7 1.8 1.7c.5 0 .9-.3 1.2-.8l1.5.9c-.5.9-1.5 1.5-2.7 1.5zm6.5-2.5h-1v1h-.8v-1h-1v-.8h1v-1h.8v1h1v.8zm3 0h-1v1h-.8v-1h-1v-.8h1v-1h.8v1h1v.8z" />
      </svg>
    )
  },
  {
    name: 'C# / .NET',
    color: '#512bd4',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#512bd4">
        <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2zm-1 12.8c-2 0-3.3-1.4-3.3-3.3s1.3-3.3 3.3-3.3c1.2 0 2.2.6 2.7 1.5l-1.5.9c-.3-.5-.7-.8-1.2-.8-1.1 0-1.8.8-1.8 1.7s.7 1.7 1.8 1.7c.5 0 .9-.3 1.2-.8l1.5.9c-.5.9-1.5 1.5-2.7 1.5zm5.5-.3l-.3 1h-.8l.3-1h-1l-.3 1h-.8l.3-1h-.7v-.8h.9l.3-1h-.9v-.8h1.1l.3-1h.8l-.3 1h1l.3-1h.8l-.3 1h.7v.8h-.9l-.3 1h.9v.8h-1.1zm-1.8-.8h1l.3-1h-1l-.3 1z" />
      </svg>
    )
  },
  {
    name: 'Java',
    color: '#f89820',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M8.8 17.5c2.4.3 4.8.3 7 0 .5-.7.9-1.5 1-2.4-1.2.3-2.6.4-4 .4-1.8 0-3.5-.2-4.9-.5.2.9.5 1.8.9 2.5zm8.9-5.1c-.2-.6-.7-1-1.3-1.3.4-.4.7-.9.8-1.4-.4.1-.9.2-1.3.2.4-.7.6-1.5.4-2.2-.4.4-.9.8-1.5 1 .1-.8 0-1.6-.3-2.4-.4.5-.8 1-1.3 1.4-.1-1-.4-2-.9-2.9-.4.7-.8 1.5-1 2.4-.4-.5-.9-1-1.5-1.4.1.7.3 1.4.6 2-.4-.2-.9-.4-1.4-.5.3.7.7 1.3 1.2 1.8-.6-.1-1.2-.1-1.7 0 .6.6 1.3 1 2.1 1.3-.8.2-1.5.6-2.1 1.1.9.4 1.9.6 3 .7-1 .5-1.8 1.2-2.3 2.1 1.1.2 2.2.3 3.4.3 1.3 0 2.6-.2 3.8-.5-.3-.6-.8-1.2-1.4-1.6 1.1-.1 2.2-.5 3.1-1.2zM7.5 19.5c2.8.5 6.1.5 8.9 0 .4-.6.6-1.2.7-1.8-3 .4-6.4.4-9.8 0 .1.6.4 1.2.8 1.8z" fill="#f89820" />
        <path d="M12 21.5c-3.3 0-6.1-.2-7.5-.7.8.7 3.5 1.2 7.5 1.2s6.7-.5 7.5-1.2c-1.4.5-4.2.7-7.5.7z" fill="#5382a1" />
      </svg>
    )
  },
  {
    name: 'MySQL',
    color: '#00758f',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#00758f">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 21l3.86-1.28C9.52 20.47 10.72 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm4.5 12.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm-5-3c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
      </svg>
    )
  },
  {
    name: 'Prisma',
    color: '#2d3748',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="none">
        <path d="M21.5 17.5L13.8 2.8c-.4-.7-1.4-.7-1.8 0L2.5 19.3c-.4.7.1 1.6.9 1.6h15.2c.8 0 1.3-.9.9-1.6l-2-3.4 4-1.4zm-9-11.4l5.3 10.1-3.6 1.3-3.2-6.5 1.5-4.9z" fill="#ffffff" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    color: '#06b6d4',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#06b6d4">
        <path d="M12 6c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1.1.2 1.8.9 2.6 1.8 1.3 1.4 2.8 3 6.3 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1.1-.2-1.8-.9-2.6-1.8-1.3-1.4-2.8-3-6.3-3zM6 12c-3 0-4.8 1.5-5.4 4.5 1.2-1.5 2.7-2.1 4.5-1.8 1.1.2 1.8.9 2.6 1.8 1.3 1.4 2.8 3 6.3 3 3 0 4.8-1.5 5.4-4.5-1.2 1.5-2.7 2.1-4.5 1.8-1.1-.2-1.8-.9-2.6-1.8-1.3-1.4-2.8-3-6.3-3z" />
      </svg>
    )
  },
  {
    name: 'GitHub Actions',
    color: '#2088ff',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#2088ff">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
      </svg>
    )
  },
  {
    name: 'HTML5',
    color: '#e34f26',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#e34f26">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.6 5.8h-7.8l.2 2.3h7.4l-.6 6.5-4.8 1.3-4.8-1.3-.3-3.6h2.2l.2 1.8 2.7.7 2.7-.7.3-3h-7.8L7.3 5.5h10.5l-.2 2.3z" />
      </svg>
    )
  },
  {
    name: 'CSS3',
    color: '#1572b6',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64" fill="#1572b6">
        <path d="M3 2l1.6 18.2L12 22l7.4-1.8L21 2H3zm14.7 5.8h-7.9l.2 2.3h7.5l-.6 6.5-4.9 1.3-4.9-1.3-.3-3.6h2.3l.2 1.8 2.7.7 2.7-.7.3-3.1h-5l-.2-2.3h5.4l.2-2.3H6.8L6.5 4.3h11.4l-.2 3.5z" />
      </svg>
    )
  },
  {
    name: 'PHP',
    color: '#777bb4',
    icon: (
      <svg viewBox="0 0 24 24" width="64" height="64">
        <ellipse cx="12" cy="12" rx="11" ry="6.5" fill="#777bb4" />
        <path d="M6 14.5l.8-4.5h2c.8 0 1.4.1 1.7.4.3.3.4.7.3 1.2-.2 1-.8 1.6-1.5 1.9-.5.2-1.2.3-2 .3H6.8L6 14.5zm1.5-2.2h1.1c.5 0 .9-.1 1.2-.3.3-.2.4-.5.5-.9 0-.4-.1-.6-.3-.7-.2-.1-.5-.2-1-.2h-.9l-.6 2.1zm4.8 2.2l1.4-8h1.2l-.6 3.2h2c.8 0 1.4.1 1.7.4.3.3.4.7.3 1.2-.2 1-.8 1.6-1.5 1.9-.5.2-1.2.3-2 .3h-1.7l-.8 4.5h-1.2zm2.1-2.2h1.1c.5 0 .9-.1 1.2-.3.3-.2.4-.5.5-.9 0-.4-.1-.6-.3-.7-.2-.1-.5-.2-1-.2h-.9l-.6 2.1z" fill="#ffffff" />
      </svg>
    )
  }
];

export const SkillsConvergence: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const dragStartRef = useRef<{ isDown: boolean; startX: number }>({
    isDown: false,
    startX: 0
  });

  // Render all 25 unique skill items once (strictly no duplicates)
  const items = SKILL_ITEMS;

  useEffect(() => {
    const stage = stageRef.current;
    const band = bandRef.current;
    const track = trackRef.current;
    if (!stage || !band || !track) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const badges = track.querySelectorAll<HTMLElement>('.convergence-badge');
    if (!badges.length) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(badges, { y: 0, rotationZ: 0, scale: 1, opacity: 1, force3D: true });
        return;
      }

      // Calculate track travel distance dynamically based on screen and track dimensions
      const getTrackTravel = () => {
        const screenWidth = window.innerWidth;
        const trackWidth = track.scrollWidth;
        const startX = Math.max(140, screenWidth * 0.40);
        const endX = -(trackWidth - screenWidth * 0.40);
        return { startX, endX };
      };

      // Master ScrollTrigger timeline scrubbed smoothly across the 320vh stage
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          invalidateOnRefresh: true
        }
      });

      // 1. Horizontal track movement: drives the badges smoothly from right to left across the focal zone
      tl.fromTo(
        track,
        { x: () => getTrackTravel().startX, force3D: true },
        {
          x: () => getTrackTravel().endX,
          ease: 'none',
          duration: 1,
          force3D: true
        },
        0
      );

      // 2. Sequential Wave Convergence for each skill badge
      const totalBadges = badges.length; // 25
      const waveDuration = 0.20; // 20% of scroll duration for each badge's full wave journey
      const maxStagger = 0.74; // Last badge enters at 74% scroll, finishes wave at 94%

      badges.forEach((badge, idx) => {
        const isEven = idx % 2 === 0;
        const startT = (idx / totalBadges) * maxStagger;
        const midT = startT + waveDuration * 0.50;

        // Alternating wave crest / trough offsets
        const initialY = isEven ? -56 : 56;
        const initialRot = isEven ? 18 : -18;
        const midY = isEven ? 24 : -24;
        const midRot = isEven ? -8 : 8;

        // Set initial pre-arrival state at t = 0
        gsap.set(badge, {
          y: initialY,
          rotationZ: initialRot,
          scale: 0.78,
          opacity: 0.35,
          force3D: true
        });

        // Phase 1: Swoop through center line from initial crest/trough into opposite wave peak
        tl.fromTo(
          badge,
          {
            y: initialY,
            rotationZ: initialRot,
            scale: 0.78,
            opacity: 0.35,
            force3D: true
          },
          {
            y: midY,
            rotationZ: midRot,
            scale: 0.92,
            opacity: 0.85,
            ease: 'sine.inOut',
            duration: waveDuration * 0.50,
            force3D: true
          },
          startT
        );

        // Phase 2: Dampen wave oscillation and lock cleanly onto straight laser axis (y=0, rot=0, scale=1, opacity=1)
        tl.to(
          badge,
          {
            y: 0,
            rotationZ: 0,
            scale: 1.0,
            opacity: 1.0,
            ease: 'sine.out',
            duration: waveDuration * 0.50,
            force3D: true
          },
          midT
        );
      });
    }, stage);

    return () => {
      ctx.revert();
    };
  }, []);

  // Dealrapp.de-style mouse drag to explore
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartRef.current = {
      isDown: true,
      startX: e.clientX
    };
    setIsGrabbing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current.isDown) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    dragStartRef.current.startX = e.clientX;
    // Dragging horizontally smoothly adjusts page scroll to advance/reverse skills along wave
    window.scrollBy({ top: -deltaX * 3.2, behavior: 'instant' });
  };

  const handleMouseUpOrLeave = () => {
    dragStartRef.current.isDown = false;
    setIsGrabbing(false);
  };

  return (
    <div ref={stageRef} className="skills-scroll-stage">
      <div className="skills-sticky-viewport">
        <section
          ref={bandRef}
          className={`skills-convergence-band ${isGrabbing ? 'is-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          aria-label="Core Technical Skills Showcase (Scroll slowly to watch each skill arrive on the wave)"
        >
          {/* Edge Vignette Fades for seamless entrance & exit (Dealrapp style) */}
          <div className="skills-band-fade skills-band-fade-left" aria-hidden="true" />
          <div className="skills-band-fade skills-band-fade-right" aria-hidden="true" />

          {/* High-tech laser convergence baseline & ambient glow */}
          <div className="skills-convergence-ambient" aria-hidden="true" />
          <div className="skills-convergence-axis" aria-hidden="true">
            <div className="skills-axis-pip" />
          </div>

          {/* Moving track containing all 25 skill logos */}
          <div ref={trackRef} className="skills-convergence-track">
            {items.map((skill, idx) => (
              <div
                key={`${skill.name}-${idx}`}
                className="convergence-badge"
                title={skill.name}
                aria-label={skill.name}
                style={{ '--badge-accent': skill.color } as React.CSSProperties}
              >
                {/* Ambient brand color aura */}
                <div className="badge-glow" aria-hidden="true" />
                {/* Top-left specular glass sheen */}
                <div className="badge-sheen" aria-hidden="true" />

                <div className="badge-icon-box" aria-hidden="true">
                  {skill.icon}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

