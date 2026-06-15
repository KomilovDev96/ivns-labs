interface BlogTranslation {
  title?: string;
  excerpt?: string;
  content?: string;
}

interface SeoLocale {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
}

interface Seo {
  ogImage?: string;
  ru?: SeoLocale;
  uz?: SeoLocale;
  en?: SeoLocale;
}

export interface BlogPost {
  _id: string;
  slug: string;
  category: 'tech' | 'business' | 'ai' | 'design' | 'news';
  color: string;
  color2: string;
  date: string;
  readTime: string;
  image?: string;
  published: boolean;
  translations?: { ru?: BlogTranslation; uz?: BlogTranslation; en?: BlogTranslation };
  seo?: Seo;
  createdAt: string;
}

interface ProjectTranslation {
  title?: string;
  desc?: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

export interface Project {
  _id: string;
  slug: string;
  tag: string;
  category: 'ecommerce' | 'fintech' | 'crm' | 'analytics' | 'automation' | 'erp';
  color: string;
  color2: string;
  year: number;
  duration: string;
  stack: string[];
  statValue: string;
  statLabel: string;
  featured: boolean;
  image?: string;
  translations?: { ru?: ProjectTranslation; uz?: ProjectTranslation; en?: ProjectTranslation };
  seo?: Seo;
  createdAt: string;
}

interface ServiceTranslation {
  title?: string;
  subtitle?: string;
  features?: string[];
}

export interface Service {
  _id: string;
  serviceId: string;
  tag: string;
  color1: string;
  color2: string;
  active: boolean;
  translations?: { ru?: ServiceTranslation; uz?: ServiceTranslation; en?: ServiceTranslation };
  seo?: Seo;
}

interface TeamTranslation {
  name?: string;
  position?: string;
  bio?: string;
  skills?: string[];
}

export interface TeamMember {
  _id: string;
  memberId: string;
  initials: string;
  color1: string;
  color2: string;
  avatar?: string;
  socials: { linkedin?: string; github?: string; telegram?: string };
  active: boolean;
  translations?: { ru?: TeamTranslation; uz?: TeamTranslation; en?: TeamTranslation };
}
