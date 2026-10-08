export type PublicationStatus = 'published' | 'accepted' | 'review' | 'preparation';

export interface Publication {
  title: string;
  authors: string[];
  authorUrls?: Record<string, string>;
  venue: string;
  year?: string;
  status: PublicationStatus;
  theme: string;
  position: number;
  url?: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string;
  github?: string;
  live?: string;
  ios?: string;
  android?: string;
}

export interface ProjectFeature {
  type: string;
  subtitle: string;
  impact: string;
}

export interface ExperienceItem {
  title: string;
  period: string;
  organization: string;
  gpa?: string;
  description: string;
}

export interface PeerReviewItem {
  journal: string;
  rank: string;
  publisher: string;
  reviews: number;
}

export interface NewsItem {
  date: string;
  category: string;
  title: string;
  description: string;
  url?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
}

export interface ResearchArea {
  title: string;
  description: string;
}

export interface HonorItem {
  title: string;
  detail?: string;
  year: string;
}

export type RouteKey =
  | 'home'
  | 'skills'
  | 'skill'
  | 'news'
  | 'research'
  | 'publication'
  | 'teaching'
  | 'industry'
  | 'projects'
  | 'education'
  | 'contacts'
  | 'admin';

