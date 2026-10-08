import React, { createContext, useContext, useState } from 'react';
import {
  Publication,
  Project,
  ProjectFeature,
  ExperienceItem,
  PeerReviewItem,
  NewsItem,
  SkillCategory,
  ResearchArea,
  HonorItem
} from '../types/portfolio';
import {
  NAME,
  DISPLAY_NAME,
  EMAIL,
  PHONE,
  WHATSAPP,
  LOCATION,
  AVATAR_URL,
  SOCIAL_LINKS,
  PROJECTS_DATA,
  PROJECT_FEATURES,
  PUBLICATIONS_DATA,
  NEWS_DATA,
  EDUCATION_DATA,
  INDUSTRY_EXPERIENCE,
  RESEARCH_EXPERIENCE,
  TEACHING_EXPERIENCE,
  SKILLS_DATA,
  RESEARCH_AREAS,
  HONORS_DATA,
  PEER_REVIEWS
} from '../data/portfolioData';

export interface ProfileData {
  name: string;
  displayName: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  avatarUrl: string;
  heroTagline: string;
  bioSummary: string;
  socialLinks: [string, string][];
}

export interface PortfolioDataState {
  profile: ProfileData;
  projects: Project[];
  projectFeatures: ProjectFeature[];
  publications: Publication[];
  news: NewsItem[];
  education: ExperienceItem[];
  industryExperience: ExperienceItem[];
  researchExperience: ExperienceItem[];
  teachingExperience: ExperienceItem[];
  skills: SkillCategory[];
  researchAreas: ResearchArea[];
  honors: HonorItem[];
  peerReviews: PeerReviewItem[];
}

const DEFAULT_PORTFOLIO_STATE: PortfolioDataState = {
  profile: {
    name: NAME,
    displayName: DISPLAY_NAME,
    email: EMAIL,
    phone: PHONE,
    whatsapp: WHATSAPP,
    location: LOCATION,
    avatarUrl: AVATAR_URL,
    heroTagline: 'Software Engineer & Back-End Developer',
    bioSummary:
      'Back-end developer & software engineer specializing in scalable architectures, high-performance RESTful APIs, and neural computing research.',
    socialLinks: SOCIAL_LINKS
  },
  projects: PROJECTS_DATA,
  projectFeatures: PROJECT_FEATURES,
  publications: PUBLICATIONS_DATA,
  news: NEWS_DATA,
  education: EDUCATION_DATA,
  industryExperience: INDUSTRY_EXPERIENCE,
  researchExperience: RESEARCH_EXPERIENCE,
  teachingExperience: TEACHING_EXPERIENCE,
  skills: SKILLS_DATA,
  researchAreas: RESEARCH_AREAS,
  honors: HONORS_DATA,
  peerReviews: PEER_REVIEWS
};

const STORAGE_KEY = 'portfolio_custom_data_v1';

export interface PortfolioContextType extends PortfolioDataState {
  updateProfile: (profile: Partial<ProfileData>) => void;
  updateProjects: (projects: Project[]) => void;
  addProject: (project: Project, feature?: ProjectFeature) => void;
  editProject: (index: number, project: Project, feature?: ProjectFeature) => void;
  deleteProject: (index: number) => void;
  updatePublications: (pubs: Publication[]) => void;
  addPublication: (pub: Publication) => void;
  editPublication: (index: number, pub: Publication) => void;
  deletePublication: (index: number) => void;
  updateNews: (news: NewsItem[]) => void;
  addNews: (item: NewsItem) => void;
  editNews: (index: number, item: NewsItem) => void;
  deleteNews: (index: number) => void;
  updateEducation: (edu: ExperienceItem[]) => void;
  updateIndustry: (ind: ExperienceItem[]) => void;
  updateHonors: (honors: HonorItem[]) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
  generateTypeScriptCode: () => string;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_PORTFOLIO_STATE,
            ...parsed,
            profile: { ...DEFAULT_PORTFOLIO_STATE.profile, ...(parsed.profile || {}) }
          };
        }
      } catch (e) {
        console.error('Failed to parse saved portfolio data:', e);
      }
    }
    return DEFAULT_PORTFOLIO_STATE;
  });

  const saveState = (newState: PortfolioDataState) => {
    setData(newState);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      } catch (e) {
        console.error('Failed to save portfolio data to localStorage:', e);
      }
    }
  };

  const updateProfile = (partial: Partial<ProfileData>) => {
    saveState({
      ...data,
      profile: {
        ...data.profile,
        ...partial
      }
    });
  };

  const updateProjects = (projects: Project[]) => {
    saveState({ ...data, projects });
  };

  const addProject = (project: Project, feature?: ProjectFeature) => {
    const defaultFeature: ProjectFeature = feature || {
      type: 'Software Application',
      subtitle: 'Client System',
      impact: 'Active Production'
    };
    saveState({
      ...data,
      projects: [project, ...data.projects],
      projectFeatures: [defaultFeature, ...data.projectFeatures]
    });
  };

  const editProject = (index: number, project: Project, feature?: ProjectFeature) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = project;
    const updatedFeatures = [...data.projectFeatures];
    if (feature) {
      updatedFeatures[index] = feature;
    }
    saveState({
      ...data,
      projects: updatedProjects,
      projectFeatures: updatedFeatures
    });
  };

  const deleteProject = (index: number) => {
    const updatedProjects = data.projects.filter((_, i) => i !== index);
    const updatedFeatures = data.projectFeatures.filter((_, i) => i !== index);
    saveState({
      ...data,
      projects: updatedProjects,
      projectFeatures: updatedFeatures
    });
  };

  const updatePublications = (publications: Publication[]) => {
    saveState({ ...data, publications });
  };

  const addPublication = (pub: Publication) => {
    saveState({
      ...data,
      publications: [pub, ...data.publications]
    });
  };

  const editPublication = (index: number, pub: Publication) => {
    const updated = [...data.publications];
    updated[index] = pub;
    saveState({
      ...data,
      publications: updated
    });
  };

  const deletePublication = (index: number) => {
    saveState({
      ...data,
      publications: data.publications.filter((_, i) => i !== index)
    });
  };

  const updateNews = (news: NewsItem[]) => {
    saveState({ ...data, news });
  };

  const addNews = (item: NewsItem) => {
    saveState({
      ...data,
      news: [item, ...data.news]
    });
  };

  const editNews = (index: number, item: NewsItem) => {
    const updated = [...data.news];
    updated[index] = item;
    saveState({
      ...data,
      news: updated
    });
  };

  const deleteNews = (index: number) => {
    saveState({
      ...data,
      news: data.news.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (education: ExperienceItem[]) => {
    saveState({ ...data, education });
  };

  const updateIndustry = (industryExperience: ExperienceItem[]) => {
    saveState({ ...data, industryExperience });
  };

  const updateHonors = (honors: HonorItem[]) => {
    saveState({ ...data, honors });
  };

  const resetToDefaults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setData(DEFAULT_PORTFOLIO_STATE);
  };

  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== 'object') return false;
      const merged: PortfolioDataState = {
        ...DEFAULT_PORTFOLIO_STATE,
        ...parsed,
        profile: { ...DEFAULT_PORTFOLIO_STATE.profile, ...(parsed.profile || {}) }
      };
      saveState(merged);
      return true;
    } catch (e) {
      console.error('Failed to import JSON data:', e);
      return false;
    }
  };

  const generateTypeScriptCode = (): string => {
    return `// Auto-generated from Admin Dashboard
import {
  Publication,
  Project,
  ProjectFeature,
  ExperienceItem,
  PeerReviewItem,
  NewsItem,
  SkillCategory,
  ResearchArea,
  HonorItem,
  RouteKey
} from '../types/portfolio';

export const NAME = ${JSON.stringify(data.profile.name)};
export const DISPLAY_NAME = ${JSON.stringify(data.profile.displayName)};
export const EMAIL = ${JSON.stringify(data.profile.email)};
export const PHONE = ${JSON.stringify(data.profile.phone)};
export const WHATSAPP = ${JSON.stringify(data.profile.whatsapp)};
export const LOCATION = ${JSON.stringify(data.profile.location)};
export const AVATAR_URL = ${JSON.stringify(data.profile.avatarUrl)};
export const GMAIL_COMPOSE_URL = \`https://mail.google.com/mail/?view=cm&fs=1&to=\${EMAIL}\`;

export const SOCIAL_LINKS: [string, string][] = ${JSON.stringify(data.profile.socialLinks, null, 2)};

export const PROJECTS_DATA: Project[] = ${JSON.stringify(data.projects, null, 2)};

export const PROJECT_FEATURES: ProjectFeature[] = ${JSON.stringify(data.projectFeatures, null, 2)};

export const PUBLICATIONS_DATA: Publication[] = ${JSON.stringify(data.publications, null, 2)};

export const NEWS_DATA: NewsItem[] = ${JSON.stringify(data.news, null, 2)};

export const EDUCATION_DATA: ExperienceItem[] = ${JSON.stringify(data.education, null, 2)};

export const INDUSTRY_EXPERIENCE: ExperienceItem[] = ${JSON.stringify(data.industryExperience, null, 2)};

export const RESEARCH_EXPERIENCE: ExperienceItem[] = ${JSON.stringify(data.researchExperience, null, 2)};

export const TEACHING_EXPERIENCE: ExperienceItem[] = ${JSON.stringify(data.teachingExperience, null, 2)};

export const SKILLS_DATA: SkillCategory[] = ${JSON.stringify(data.skills, null, 2)};

export const RESEARCH_AREAS: ResearchArea[] = ${JSON.stringify(data.researchAreas, null, 2)};

export const HONORS_DATA: HonorItem[] = ${JSON.stringify(data.honors, null, 2)};

export const PEER_REVIEWS: PeerReviewItem[] = ${JSON.stringify(data.peerReviews, null, 2)};
`;
  };

  return (
    <PortfolioContext.Provider
      value={{
        ...data,
        updateProfile,
        updateProjects,
        addProject,
        editProject,
        deleteProject,
        updatePublications,
        addPublication,
        editPublication,
        deletePublication,
        updateNews,
        addNews,
        editNews,
        deleteNews,
        updateEducation,
        updateIndustry,
        updateHonors,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        generateTypeScriptCode
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Graceful fallback if outside provider
    return {
      ...DEFAULT_PORTFOLIO_STATE,
      updateProfile: () => {},
      updateProjects: () => {},
      addProject: () => {},
      editProject: () => {},
      deleteProject: () => {},
      updatePublications: () => {},
      addPublication: () => {},
      editPublication: () => {},
      deletePublication: () => {},
      updateNews: () => {},
      addNews: () => {},
      editNews: () => {},
      deleteNews: () => {},
      updateEducation: () => {},
      updateIndustry: () => {},
      updateHonors: () => {},
      resetToDefaults: () => {},
      exportDataJson: () => JSON.stringify(DEFAULT_PORTFOLIO_STATE, null, 2),
      importDataJson: () => false,
      generateTypeScriptCode: () => ''
    };
  }
  return context;
};
