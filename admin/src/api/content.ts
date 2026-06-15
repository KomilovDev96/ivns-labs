import api from './axios';

export interface ContentDoc {
  _id: string;
  section: string;
  ru: Record<string, string>;
  uz: Record<string, string>;
  en: Record<string, string>;
}

export const getAllContent = () => api.get<ContentDoc[]>('/content').then((r) => r.data);
export const getContentBySection = (section: string) =>
  api.get<ContentDoc>(`/content/${section}`).then((r) => r.data);
export const upsertContent = (data: { section: string; ru: Record<string, string>; uz: Record<string, string>; en: Record<string, string> }) =>
  api.post('/content', data).then((r) => r.data);

export const seedDefaults = () => api.post('/content/seed/defaults').then((r) => r.data);
export const seedForce = () => api.post('/content/seed/force').then((r) => r.data);

export const seedAllData = () => api.post('/seed').then((r) => r.data);
export const seedAllForce = () => api.post('/seed/force').then((r) => r.data);
