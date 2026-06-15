const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export interface ApiTranslation { ru?: string; uz?: string; en?: string }

// ── Content sections ─────────────────────────────────────────────
export interface ContentSection {
  section: string;
  ru: Record<string, string>;
  uz: Record<string, string>;
  en: Record<string, string>;
}

export const getAllContent = () => get<ContentSection[]>('/content');
export const getContentSection = (section: string) => get<ContentSection>(`/content/${section}`);

// ── Blog ─────────────────────────────────────────────────────────
export interface ApiBlogPost {
  _id: string;
  slug: string;
  category: string;
  color: string;
  color2: string;
  date: string;
  readTime: string;
  image?: string;
  published: boolean;
  translations?: {
    ru?: { title?: string; excerpt?: string; content?: string };
    uz?: { title?: string; excerpt?: string; content?: string };
    en?: { title?: string; excerpt?: string; content?: string };
  };
}

export const getApiBlogPosts = () => get<ApiBlogPost[]>('/blog');
export const getApiBlogPost = (slug: string) =>
  get<ApiBlogPost[]>('/blog').then(posts => posts?.find(p => p.slug === slug) ?? null);

// ── Projects ─────────────────────────────────────────────────────
export interface ApiProject {
  _id: string;
  slug: string;
  tag: string;
  category: string;
  color: string;
  color2: string;
  year: number;
  duration: string;
  stack: string[];
  statValue: string;
  statLabel: string;
  featured: boolean;
  image?: string;
  translations?: {
    ru?: { title?: string; desc?: string; challenge?: string; solution?: string; result?: string };
    uz?: { title?: string; desc?: string; challenge?: string; solution?: string; result?: string };
    en?: { title?: string; desc?: string; challenge?: string; solution?: string; result?: string };
  };
}

export const getApiProjects = () => get<ApiProject[]>('/projects');
export const getApiProject = (slug: string) =>
  get<ApiProject[]>('/projects').then(projects => projects?.find(p => p.slug === slug) ?? null);

// ── Services ─────────────────────────────────────────────────────
export interface ApiService {
  _id: string;
  serviceId: string;
  tag: string;
  color1: string;
  color2: string;
  active: boolean;
  translations?: {
    ru?: { title?: string; subtitle?: string };
    uz?: { title?: string; subtitle?: string };
    en?: { title?: string; subtitle?: string };
  };
}

export const getApiServices = () => get<ApiService[]>('/services');

// ── Team ─────────────────────────────────────────────────────────
export interface ApiTeamMember {
  _id: string;
  memberId: string;
  initials: string;
  color1: string;
  color2: string;
  avatar?: string;
  socials: { linkedin?: string; github?: string; telegram?: string };
  active: boolean;
  translations?: {
    ru?: { name?: string; position?: string; bio?: string; skills?: string[] };
    uz?: { name?: string; position?: string; bio?: string; skills?: string[] };
    en?: { name?: string; position?: string; bio?: string; skills?: string[] };
  };
}

export const getApiTeam = () => get<ApiTeamMember[]>('/team');

// ── Helpers ──────────────────────────────────────────────────────
export type Locale = 'ru' | 'uz' | 'en';

export function t<T extends Record<string, any>>(
  obj: { ru?: T; uz?: T; en?: T } | undefined,
  locale: Locale,
  key: keyof T,
): string {
  return (obj?.[locale]?.[key] ?? obj?.ru?.[key] ?? '') as string;
}
