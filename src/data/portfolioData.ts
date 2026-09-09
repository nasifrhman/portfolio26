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

export const NAME = 'Md. Nasifur Rahman';
export const DISPLAY_NAME = 'Md. Nasifur Rahman';
export const EMAIL = 'mdnasifurahman@gmail.com';
export const PHONE = '+8801863960668';
export const WHATSAPP = 'https://wa.me/1798552909';
export const LOCATION = 'Dhaka, Bangladesh';
export const AVATAR_URL = '/avatar.png';
export const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;

export const SOCIAL_LINKS: [string, string][] = [
  ['LinkedIn', 'https://www.linkedin.com/in/nasifrhman/'],
  ['GitHub', 'https://github.com/nasifrhman'],
  ['WhatsApp', 'https://wa.me/1798552909'],
  ['Springer Paper', 'https://link.springer.com/article/10.1007/s00521-025-11289-0']
];

export const NAV_LINKS: [RouteKey, string][] = [
  ['home', 'Home'],
  ['experience', 'Industry' as any] as any,
  ['news', 'News'],
  ['research', 'Research'],
  ['publication', 'Publication'],
  ['industry', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contacts', 'Contact']
];

export const REAL_NAV_LINKS: [RouteKey, string][] = [
  ['home', 'Home'],
  ['industry', 'Experience'],
  ['projects', 'Projects'],
  ['publication', 'Publication'],
  ['research', 'Research'],
  ['news', 'News'],
  ['education', 'Education'],
  ['contacts', 'Contact']
];

export const ROUTE_TITLES: Record<RouteKey, string> = {
  home: 'Md. Nasifur Rahman — Software Engineer & Back-End Developer',
  news: 'News | Md. Nasifur Rahman',
  research: 'Research | Md. Nasifur Rahman',
  publication: 'Publications | Md. Nasifur Rahman',
  teaching: 'Academic | Md. Nasifur Rahman',
  industry: 'Experience | Md. Nasifur Rahman',
  projects: 'Projects | Md. Nasifur Rahman',
  education: 'Education | Md. Nasifur Rahman',
  contacts: 'Contact | Md. Nasifur Rahman'
};

export const EXPLORE_CARDS: [string, string, string][] = [
  ['industry', 'Experience', 'Backend development, system architecture, and agency leadership'],
  ['projects', 'Projects', 'Deployed web, mobile, and fintech client systems'],
  ['publication', 'Publication', 'Peer-reviewed research in Springer Neural Computing'],
  ['research', 'Research', 'Machine learning, model averaging, and backend systems'],
  ['education', 'Education', 'BSc in CSE from AIUB, Notre Dame College, and Dean’s List honors'],
  ['contacts', 'Contact', 'Email, WhatsApp, phone, and direct collaboration details']
];

export const STATUS_MAP = {
  published: { label: 'Published', className: 'st-pub' },
  accepted: { label: 'Accepted', className: 'st-acc' },
  review: { label: 'Under Review', className: 'st-rev' },
  preparation: { label: 'In Preparation', className: 'st-prep' }
};

export const EDUCATION_DATA: ExperienceItem[] = [
  {
    title: 'Bachelor of Science in Computer Science and Engineering',
    period: '2020 - 2024',
    organization: 'American International University-Bangladesh (AIUB)',
    description: 'Completed BSc in CSE. Worked as a Research Assistant in AI and Machine Learning, leading to a published research paper in a top-ranked international journal.'
  },
  {
    title: 'Higher Secondary School Certificate (HSC)',
    period: '2016 - 2018',
    organization: 'Notre Dame College, Mymensingh',
    description: 'Completed higher secondary education in Science division with strong foundation in mathematics and computing.'
  }
];

export const INDUSTRY_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Back-End Developer',
    period: 'Jul 2025 – Present',
    organization: 'Sparktech Agency · Full-time',
    description: 'Designing and engineering scalable backend architectures, high-performance RESTful APIs, database schemas, and cloud deployment pipelines for international client applications.'
  },
  {
    title: 'Junior Back-End Developer',
    period: 'Feb 2025 – Jul 2025',
    organization: 'Sparktech Agency · Full-time',
    description: 'Developed robust backend services, integrated third-party payment and auth APIs, optimized database queries (MongoDB/MySQL), and collaborated closely with cross-functional teams.'
  },
  {
    title: 'Software Engineering Trainee',
    period: 'Nov 2024 – Jan 2025',
    organization: 'Sparktech Agency',
    description: 'Completed rigorous training in modern backend architectures, MVC/REST paradigms, version control workflows, and industry-grade production deployment practices.'
  }
];

export const RESEARCH_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Research Assistant',
    period: 'Jan 2024 – May 2024',
    organization: 'American International University-Bangladesh (AIUB)',
    description: 'Conducted end-to-end research in machine learning and neural computing. Proposed a novel cluster-based model averaging method using class occurrences, successfully published in Springer Neural Computing and Applications (2025).'
  }
];

export const TEACHING_EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Academic & Peer Support',
    period: '2023 - 2024',
    organization: 'Department of Computer Science, AIUB',
    description: 'Assisted undergraduate peers in Object-Oriented Programming, Data Structures, Algorithms, and introductory Machine Learning.'
  }
];

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    title: 'Machine Learning and Neural Computing',
    description: 'Model averaging, clustering techniques, class occurrences, ensemble methods, and neural network optimization for accelerated inference.'
  },
  {
    title: 'Backend Architecture & Microservices',
    description: 'High-throughput RESTful API design, modular service architectures, caching strategies, database normalization, and query performance tuning.'
  },
  {
    title: 'Full-Stack Web & Mobile Ecosystems',
    description: 'Scalable applications using React, Node.js, Express, ASP.NET Core, and React Native with robust cloud infrastructure.'
  },
  {
    title: 'Cloud DevOps & Production Delivery',
    description: 'Containerization with Docker, CI/CD pipelines, Linux server administration, Nginx reverse proxies, AWS, and secure deployment pipelines.'
  }
];

export const PEER_REVIEWS: PeerReviewItem[] = [
  { journal: 'Neural Computing and Applications', rank: 'Q1', publisher: 'Springer', reviews: 1 }
];

export const NEWS_DATA: NewsItem[] = [
  {
    date: '2025',
    category: 'Paper Publication',
    title: 'Paper published in Springer Neural Computing and Applications',
    description: 'Our paper "Accelerating model averaging with cluster-based approach using class occurrences" was published in the prestigious Springer journal Neural Computing and Applications.',
    url: 'https://link.springer.com/article/10.1007/s00521-025-11289-0'
  },
  {
    date: 'Jul 2025',
    category: 'Career Milestone',
    title: 'Promoted to Back-End Developer at Sparktech Agency',
    description: 'Stepped into full Back-End Developer responsibilities, leading backend architecture design and client deliverables.'
  },
  {
    date: 'Feb 2025',
    category: 'Career Milestone',
    title: 'Joined Sparktech Agency as Junior Back-End Developer',
    description: 'Started full-time role building scalable backend services and web applications for global clients.'
  },
  {
    date: 'Nov 2024',
    category: 'Career Milestone',
    title: 'Joined Sparktech Agency as Software Engineering Trainee',
    description: 'Began professional software engineering career focusing on backend development and systems.'
  },
  {
    date: 'May 2024',
    category: 'Graduation',
    title: 'Graduated BSc in Computer Science & Engineering from AIUB',
    description: 'Successfully completed undergraduate degree with high academic standing and research honors.'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'JavaScript, TypeScript, C++, C#, Java, Python, HTML5, CSS3, PHP'
  },
  {
    title: 'Frameworks & Libraries',
    description: 'Node.js, Express.js, React.js, ASP.NET Core, Tailwind CSS, Bootstrap'
  },
  {
    title: 'Databases & Storage',
    description: 'MongoDB, MySQL, PostgreSQL, Prisma ORM, Redis'
  },
  {
    title: 'Tools, Cloud & DevOps',
    description: 'Git, GitHub Actions, Docker, CI/CD, Linux, Nginx, AWS, Hostinger, Netlify'
  },
  {
    title: 'Backend Engineering',
    description: 'RESTful API Design, Microservices Architecture, JWT Authentication, Database Schema Design, Query Optimization, Third-party API Integrations'
  },
  {
    title: 'Research & Machine Learning',
    description: 'Neural Computing, Model Averaging, Cluster-Based Approaches, Python (NumPy, Pandas, Scikit-learn), Data Preprocessing'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: 'Deenyah – Umrah Badal Platform',
    description: 'A full-stack web and cross-platform mobile ecosystem engineered for Umrah Badal services. Features transparent booking, verified performance tracking, real-time status updates, and digital certificates for international users.',
    stack: 'Node.js · Express.js · React.js · React Native · MongoDB · AWS · REST API · iOS & Android',
    live: 'https://deenyah.com',
    ios: 'https://apps.apple.com/us/app/deenyah/id6756536239',
    android: 'https://play.google.com/store/apps/details?id=com.deenyah.customer&hl=en_US',
    github: 'https://github.com/nasifrhman'
  },
  {
    title: 'HavnProp.io – Real Estate Platform',
    description: 'An advanced real estate analytics and investment platform designed to help investors calculate returns, evaluate property values, simulate mortgages, and analyze financial metrics for smarter, data-driven decisions.',
    stack: 'React.js · Node.js · Express.js · PostgreSQL · Mobile App · Cloudflare · REST API',
    live: 'https://havnprop.io',
    android: 'https://play.google.com/store/apps/details?id=com.benjamin.havnapp',
    github: 'https://github.com/nasifrhman'
  },
  {
    title: 'Training Plus – Sports Training App',
    description: 'An all-in-one sports and fitness mobile training application with athlete progress logging, workout schedules, customized training programs, and performance analytics.',
    stack: 'Android · Node.js · Express.js · MongoDB · REST APIs · Google Play Store',
    live: 'https://play.google.com/store/apps/details?id=com.trainingplus.app',
    android: 'https://play.google.com/store/apps/details?id=com.trainingplus.app',
    github: 'https://github.com/nasifrhman'
  },
  {
    title: 'Oriboshi – Astrophotography Platform',
    description: 'A specialized platform for astrophotography enthusiasts and learners, featuring interactive online courses, high-resolution astronomical image galleries, and on-site observatory service bookings.',
    stack: 'React.js · Node.js · Express.js · Tailwind CSS · Cloud Storage · REST API',
    live: 'https://oriboshi.com',
    github: 'https://github.com/nasifrhman'
  },
  {
    title: 'Love of Sewing – Course Platform',
    description: 'An international e-learning platform providing structured sewing video courses, student progress dashboards, payment gateway integration, and course management.',
    stack: 'React.js · Node.js · Express.js · MySQL · Stripe · Netlify',
    live: 'https://loveofsewing.de',
    github: 'https://github.com/nasifrhman'
  }
];

export const PROJECT_FEATURES: ProjectFeature[] = [
  {
    type: 'Full Stack & Mobile',
    subtitle: 'Web & mobile platform for Umrah Badal services',
    impact: 'Live Web, iOS & Android apps'
  },
  {
    type: 'Fintech & Real Estate',
    subtitle: 'Real estate investment calculation & evaluation platform',
    impact: 'Active platform with Android app'
  },
  {
    type: 'Mobile & Fitness',
    subtitle: 'All-in-one athlete performance tracking & training platform',
    impact: 'Published on Google Play Store'
  },
  {
    type: 'Web Platform',
    subtitle: 'Astrophotography courses, gallery & on-site services',
    impact: 'Commercial live platform'
  },
  {
    type: 'E-Learning Platform',
    subtitle: 'Online platform for professional sewing courses & management',
    impact: 'Live international platform'
  }
];

export const PUBLICATIONS_DATA: Publication[] = [
  {
    title: 'Accelerating model averaging with cluster-based approach using class occurrences',
    authors: ['Md. Nasifur Rahman', 'Ruksat Khan Shayoni', 'M. F. Mridha', 'Jungpil Shin'],
    venue: 'Springer Neural Computing and Applications',
    year: '2025',
    status: 'published',
    theme: 'Machine Learning & Neural Computing',
    position: 1,
    url: 'https://link.springer.com/article/10.1007/s00521-025-11289-0'
  }
];

export const HONORS_DATA: HonorItem[] = [
  {
    title: 'Springer Journal Publication',
    detail: 'Neural Computing and Applications (2025)',
    year: '2025'
  },
  {
    title: "Dean's List Award",
    detail: 'American International University-Bangladesh (AIUB)',
    year: 'Spring 2020–2021'
  },
  {
    title: "Dean's List Award",
    detail: 'American International University-Bangladesh (AIUB)',
    year: 'Fall 2021–2022'
  },
  {
    title: 'BSc in Computer Science & Engineering',
    detail: 'American International University-Bangladesh (AIUB)',
    year: '2024'
  }
];
