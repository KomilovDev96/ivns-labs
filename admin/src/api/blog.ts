import api from './axios';
import type { BlogPost } from '../types';

export const getBlogPosts = () => api.get<BlogPost[]>('/blog/admin').then((r) => r.data);
export const createBlogPost = (data: Omit<BlogPost, '_id' | 'createdAt'>) =>
  api.post('/blog', data).then((r) => r.data);
export const updateBlogPost = (id: string, data: Partial<BlogPost>) =>
  api.put(`/blog/${id}`, data).then((r) => r.data);
export const deleteBlogPost = (id: string) =>
  api.delete(`/blog/${id}`).then((r) => r.data);
