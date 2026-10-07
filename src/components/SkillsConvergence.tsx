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

export interface SkillsSphereProps {
  compact?: boolean;
}

export const SkillsConvergence: React.FC<SkillsSphereProps> = ({ compact = false }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // References for smooth 60-120fps physics loop with scroll scrub
  const rotState = useRef({
    angleX: 0.22,
    angleY: 0.35,
    velX: 0,
    velY: 0,
    targetVelX: 0,
    targetVelY: 0,
    lastScrollY: 0,
    scrollProgress: 0,
    isStageActive: false,
    isPointerDown: false,
    pointerStartX: 0,
    pointerStartY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    isHovered: false,
    userDragOffsetX: 0,
    userDragOffsetY: 0,
  });

  const items = SKILL_ITEMS;

  // Pre-calculate normalized Fibonacci sphere coordinates on mount
  const sphereNodes = useRef<
    { skill: SkillItem; x: number; y: number; z: number }[]
  >([]);

  if (sphereNodes.current.length === 0) {
    const N = items.length; // 25
    sphereNodes.current = items.map((skill, i) => {
      // Golden spiral distribution on unit sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      return { skill, x, y, z };
    });
  }

  useEffect(() => {
    rotState.current.lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - rotState.current.lastScrollY;
      rotState.current.lastScrollY = currentScrollY;

      if (compact) {
        // In Hero compact mode: page scroll smoothly rotates the ball
        if (Math.abs(deltaY) > 0.5) {
          rotState.current.targetVelY += deltaY * 0.0016;
          rotState.current.targetVelX += deltaY * 0.0007;
        }
      } else {
        // In full standalone mode: measure scroll progress through the stage
        const stage = stageRef.current;
        if (stage) {
          const rect = stage.getBoundingClientRect();
          const stageTop = rect.top;
          const stageHeight = rect.height;
          const viewportHeight = window.innerHeight;
          const scrollDistance = stageHeight - viewportHeight;

          if (scrollDistance > 0) {
            const rawProgress = -stageTop / scrollDistance;
            const progress = Math.max(0, Math.min(1, rawProgress));
            rotState.current.scrollProgress = progress;
            rotState.current.isStageActive = rawProgress >= -0.05 && rawProgress <= 1.05;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;

    const render = () => {
      const state = rotState.current;
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (container) {
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        if (width === 0 || height === 0) {
          animationFrameId = requestAnimationFrame(render);
          return;
        }

        const cx = width / 2;
        const cy = height / 2;

        // Dynamic sphere radius based on mode and container dimensions
        const radius = compact
          ? Math.min(205, Math.max(130, Math.min(width, height) * 0.42))
          : Math.min(250, Math.max(150, width * 0.30));

        const focalLength = compact ? 490 : 560;

        if (!compact && state.isStageActive && !state.isPointerDown) {
          const targetAngleY = state.scrollProgress * (Math.PI * 2.8) + state.userDragOffsetY;
          const targetAngleX = 0.22 + Math.sin(state.scrollProgress * Math.PI) * 0.40 + state.userDragOffsetX;

          state.angleY += (targetAngleY - state.angleY) * 0.075;
          state.angleX += (targetAngleX - state.angleX) * 0.075;
        } else if (!state.isPointerDown) {
          // Gentle ambient idle drift
          const idleY = state.isHovered ? 0.0004 : (compact ? 0.0026 : 0.0016);
          const idleX = state.isHovered ? 0.0001 : (compact ? 0.0009 : 0.0006);

          state.velY += (state.targetVelY - state.velY) * 0.06;
          state.velX += (state.targetVelX - state.velX) * 0.06;

          state.angleY += state.velY + idleY;
          state.angleX += state.velX + idleX;

          state.targetVelY *= 0.92;
          state.targetVelX *= 0.92;
        }

        const cosX = Math.cos(state.angleX);
        const sinX = Math.sin(state.angleX);
        const cosY = Math.cos(state.angleY);
        const sinY = Math.sin(state.angleY);

        // Transform 3D nodes
        const projected = sphereNodes.current.map((node) => {
          // Rotate around X axis
          const y1 = node.y * cosX - node.z * sinX;
          const z1 = node.y * sinX + node.z * cosX;

          // Rotate around Y axis
          const x2 = node.x * cosY + z1 * sinY;
          const z2 = -node.x * sinY + z1 * cosY;

          const px = x2 * radius;
          const py = y1 * radius;
          const pz = z2 * radius;

          const scale = focalLength / (focalLength + pz);
          const screenX = cx + px * scale;
          const screenY = cy + py * scale;
          const normZ = (pz + radius) / (2 * radius); // 0 (back) to 1 (front)
          const opacity = Math.max(0.24, Math.min(1.0, 0.24 + 0.76 * normZ));
          const zIndex = Math.round(normZ * 100);

          return { screenX, screenY, scale, opacity, zIndex, pz, normZ };
        });

        // 1. Draw Canvas: Holographic ball ambient core, wireframe rings, and constellation links
        if (canvas) {
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
          }
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, width, height);

            // Ambient central glowing sphere aura
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.05);
            grad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
            grad.addColorStop(0.55, 'rgba(96, 165, 250, 0.04)');
            grad.addColorStop(0.85, 'rgba(255, 255, 255, 0.015)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
            ctx.fill();

            // Wireframe 3D Latitude Rings (Equator + 2 Parallels)
            const latitudes = [-0.55, 0, 0.55];
            latitudes.forEach((latY) => {
              const rLat = Math.sqrt(Math.max(0, 1 - latY * latY));
              const steps = 48;
              ctx.beginPath();
              let first = true;

              for (let s = 0; s <= steps; s++) {
                const theta = (s / steps) * Math.PI * 2;
                const lx = Math.cos(theta) * rLat;
                const ly = latY;
                const lz = Math.sin(theta) * rLat;

                const ly1 = ly * cosX - lz * sinX;
                const lz1 = ly * sinX + lz * cosX;
                const lx2 = lx * cosY + lz1 * sinY;
                const lz2 = -lx * sinY + lz1 * cosY;

                const lScale = focalLength / (focalLength + lz2 * radius);
                const lsx = cx + lx2 * radius * lScale;
                const lsy = cy + ly1 * radius * lScale;

                if (first) {
                  ctx.moveTo(lsx, lsy);
                  first = false;
                } else {
                  ctx.lineTo(lsx, lsy);
                }
              }
              ctx.strokeStyle = latY === 0 ? 'rgba(96, 165, 250, 0.22)' : 'rgba(96, 165, 250, 0.10)';
              ctx.lineWidth = latY === 0 ? 1.5 : 1;
              ctx.stroke();
            });

            // Longitudinal Great Circle
            ctx.beginPath();
            const lonSteps = 48;
            for (let s = 0; s <= lonSteps; s++) {
              const theta = (s / lonSteps) * Math.PI * 2;
              const lx = 0;
              const ly = Math.sin(theta);
              const lz = Math.cos(theta);

              const ly1 = ly * cosX - lz * sinX;
              const lz1 = ly * sinX + lz * cosX;
              const lx2 = lx * cosY + lz1 * sinY;
              const lz2 = -lx * sinY + lz1 * cosY;

              const lScale = focalLength / (focalLength + lz2 * radius);
              const lsx = cx + lx2 * radius * lScale;
              const lsy = cy + ly1 * radius * lScale;

              if (s === 0) ctx.moveTo(lsx, lsy);
              else ctx.lineTo(lsx, lsy);
            }
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.12)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Front constellation links between nearby front badges
            ctx.lineWidth = 0.8;
            for (let i = 0; i < projected.length; i++) {
              if (projected[i].pz < -radius * 0.1) continue;
              for (let j = i + 1; j < projected.length; j++) {
                if (projected[j].pz < -radius * 0.1) continue;
                const ddx = projected[i].screenX - projected[j].screenX;
                const ddy = projected[i].screenY - projected[j].screenY;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                if (dist < radius * 0.65) {
                  const linkAlpha = (1 - dist / (radius * 0.65)) * 0.18;
                  ctx.strokeStyle = `rgba(96, 165, 250, ${linkAlpha})`;
                  ctx.beginPath();
                  ctx.moveTo(projected[i].screenX, projected[i].screenY);
                  ctx.lineTo(projected[j].screenX, projected[j].screenY);
                  ctx.stroke();
                }
              }
            }
          }
        }

        // 2. Direct DOM Badge Updates for 120 FPS performance
        projected.forEach((p, idx) => {
          const el = badgeRefs.current[idx];
          if (!el) return;

          el.style.transform = `translate3d(${p.screenX}px, ${p.screenY}px, 0px) translate(-50%, -50%) scale(${p.scale.toFixed(3)})`;
          el.style.opacity = p.opacity.toFixed(3);
          el.style.zIndex = `${p.zIndex}`;

          // Subtle depth blur for skills orbiting on the back side of the ball
          if (p.pz < -radius * 0.25) {
            const blurAmt = ((1 - p.normZ) * 2.0).toFixed(1);
            el.style.filter = `blur(${blurAmt}px) brightness(0.72)`;
          } else {
            el.style.filter = 'none';
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [compact]);

  // Pointer Drag handling to spin the sphere in any direction
  const handlePointerDown = (e: React.PointerEvent) => {
    rotState.current.isPointerDown = true;
    rotState.current.pointerStartX = e.clientX;
    rotState.current.pointerStartY = e.clientY;
    rotState.current.lastPointerX = e.clientX;
    rotState.current.lastPointerY = e.clientY;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!rotState.current.isPointerDown) return;
    const dx = e.clientX - rotState.current.lastPointerX;
    const dy = e.clientY - rotState.current.lastPointerY;
    rotState.current.lastPointerX = e.clientX;
    rotState.current.lastPointerY = e.clientY;

    rotState.current.userDragOffsetY += dx * 0.005;
    rotState.current.userDragOffsetX -= dy * 0.005;
    rotState.current.angleY += dx * 0.005;
    rotState.current.angleX -= dy * 0.005;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    rotState.current.isPointerDown = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored if not captured
    }
  };

  // Hero Section Compact Mode: Just the interactive 3D ball, no text
  if (compact) {
    return (
      <div className="hero-skills-ball-container">
        <div className="hero-skills-ambient-glow" aria-hidden="true" />
        <div
          ref={containerRef}
          className={`skills-sphere-stage is-compact ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <canvas ref={canvasRef} className="skills-sphere-canvas" />

          {items.map((skill, idx) => (
            <div
              key={skill.name}
              ref={(el) => {
                badgeRefs.current[idx] = el;
              }}
              className={`sphere-badge is-compact ${activeSkill?.name === skill.name ? 'is-active' : ''}`}
              style={{ '--badge-accent': skill.color } as React.CSSProperties}
              onMouseEnter={() => {
                rotState.current.isHovered = true;
                setActiveSkill(skill);
              }}
              onMouseLeave={() => {
                rotState.current.isHovered = false;
                setActiveSkill(null);
              }}
              title={skill.name}
              aria-label={skill.name}
            >
              <div className="sphere-badge-glow" aria-hidden="true" />
              <div className="sphere-badge-sheen" aria-hidden="true" />
              <div className="sphere-badge-icon" aria-hidden="true">
                {skill.icon}
              </div>
              <span className="sphere-badge-label mono">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Full Standalone Section Mode (e.g. for dedicated skills explore)
  return (
    <div ref={stageRef} className="skills-sphere-scroll-stage">
      <div className="skills-sphere-sticky-viewport">
        <section className="skills-sphere-section" aria-label="3D Interactive Skills Sphere">
          {/* Editorial Header */}
          <div className="skills-sphere-header wrap">
            <div className="section-label">Interactive Tech Matrix</div>
            <h2 className="skills-sphere-title">
              Technical <em>Skills Sphere.</em>
            </h2>
            <p className="skills-sphere-desc">
              Scroll slowly down to rotate the ball and view every skill one by one, or drag with your cursor to explore the stack in 3D.
            </p>

          </div>

          {/* 3D Sphere Interactive Stage */}
          <div
            ref={containerRef}
            className={`skills-sphere-stage ${isDragging ? 'is-dragging' : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Holographic Wireframe Canvas */}
            <canvas ref={canvasRef} className="skills-sphere-canvas" />

            {/* 3D Projected Skill Badges */}
            {items.map((skill, idx) => (
              <div
                key={skill.name}
                ref={(el) => {
                  badgeRefs.current[idx] = el;
                }}
                className={`sphere-badge ${activeSkill?.name === skill.name ? 'is-active' : ''}`}
                style={{ '--badge-accent': skill.color } as React.CSSProperties}
                onMouseEnter={() => {
                  rotState.current.isHovered = true;
                  setActiveSkill(skill);
                }}
                onMouseLeave={() => {
                  rotState.current.isHovered = false;
                  setActiveSkill(null);
                }}
                title={skill.name}
                aria-label={skill.name}
              >
                {/* Ambient Brand Halo */}
                <div className="sphere-badge-glow" aria-hidden="true" />
                {/* Specular Sheen */}
                <div className="sphere-badge-sheen" aria-hidden="true" />

                <div className="sphere-badge-icon" aria-hidden="true">
                  {skill.icon}
                </div>

                {/* Micro Name Label */}
                <span className="sphere-badge-label mono">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export { SkillsConvergence as SkillsSphere };
export default SkillsConvergence;


