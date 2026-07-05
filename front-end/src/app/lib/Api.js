import { customAxios } from './axios';

export const api = {
  auth: {
    register: (data) => customAxios.post('/auth/register', data),
    login: (data) => customAxios.post('/auth/login', data),
    me: () => customAxios.get('/auth/me'),
    logout: () => customAxios.post('/auth/logout'),
    googleAuth: () => customAxios.get('/auth/google/redirect'),
    forgotPasswordApi: (email) =>
      customAxios.post('/auth/forgot-password', { email }),
    resetPassword: (data) => customAxios.post('/auth/reset-password', data),
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
