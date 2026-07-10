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
      index: (params = {}) => customAxios.get('/admin/users', { params }),

      show: (id) => customAxios.get(`/admin/users/${id}`),

      store: (data) => customAxios.post('/admin/users', data),

      update: ({ id, formData }) =>
        customAxios.put(`/admin/users/${id}`, formData),

      destroy: (id) => customAxios.delete(`/admin/users/${id}`),
    },
  },
  categories: {
    index: (params = {}) =>
      customAxios.get('/categories', {
        params,
      }),
    show: (id) => customAxios.get(`/categories/${id}`),

    store: (formData) =>
      customAxios.post('/admin/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),

    update: (id, formData) =>
      customAxios.post(`/admin/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),

    destroy: (id) => customAxios.delete(`/admin/categories/${id}`),
  },
};
