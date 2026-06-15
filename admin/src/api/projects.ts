import api from './axios';
import type { Project } from '../types';

export const getProjects = () => api.get<Project[]>('/projects').then((r) => r.data);
export const createProject = (data: Omit<Project, '_id' | 'createdAt'>) =>
  api.post('/projects', data).then((r) => r.data);
export const updateProject = (id: string, data: Partial<Project>) =>
  api.put(`/projects/${id}`, data).then((r) => r.data);
export const deleteProject = (id: string) =>
  api.delete(`/projects/${id}`).then((r) => r.data);
