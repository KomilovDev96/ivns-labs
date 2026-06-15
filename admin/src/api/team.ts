import api from './axios';
import type { TeamMember } from '../types';

export const getTeam = () => api.get<TeamMember[]>('/team/admin').then((r) => r.data);
export const createTeamMember = (data: Omit<TeamMember, '_id'>) =>
  api.post('/team', data).then((r) => r.data);
export const updateTeamMember = (id: string, data: Partial<TeamMember>) =>
  api.put(`/team/${id}`, data).then((r) => r.data);
export const deleteTeamMember = (id: string) =>
  api.delete(`/team/${id}`).then((r) => r.data);
