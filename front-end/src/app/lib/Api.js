import { customAxios } from './axios';

export const api = {
  getSanctumCsrfCookie: () => customAxios.get('sanctum/csrf-cookie '),
  auth: {
    register: (data) => customAxios.post('/auth/register', data),
    login: (data) => customAxios.post('/auth/login', data),
    me: () => customAxios.get('/auth/me'),
    logout: () => customAxios.post('/auth/logout'),
  },
  profile: {
    show: () => customAxios.get('/profile'),
    update: (data) => customAxios.patch('/profile', data),
    destroy: () => customAxios.delete('/profile'),
  },
  admin: {
    users: {
      index: () => customAxios.get('/admin/users'),
      store: (data) => customAxios.post('/admin/users', data),
      update: (id, data) => customAxios.patch(`/admin/users/${id}`, data),
      destroy: (id) => customAxios.delete(`/admin/users/${id}`),
    },
  },
};
