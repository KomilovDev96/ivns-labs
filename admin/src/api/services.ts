import api from './axios';
import type { Service } from '../types';

export const getServices = () => api.get<Service[]>('/services/admin').then((r) => r.data);
export const createService = (data: Omit<Service, '_id'>) =>
  api.post('/services', data).then((r) => r.data);
export const updateService = (id: string, data: Partial<Service>) =>
  api.put(`/services/${id}`, data).then((r) => r.data);
export const deleteService = (id: string) =>
  api.delete(`/services/${id}`).then((r) => r.data);
