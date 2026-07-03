import axios from 'axios';
import Cookies from 'js-cookie';

const backEndUrl = import.meta.env.VITE_BACK_END_URL;

if (!backEndUrl) {
  throw new Error('VITE_BACK_END_URL is not defined in environment variables');
}

export const customAxios = axios.create({
  baseURL: backEndUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401 || status === 403) {
      Cookies.remove('token');
      if (status === 401 && window.location.pathname.startsWith('/admin')) {
        window.location.replace('/auth?message=unauthorized');
      }
    }

    return Promise.reject(error);
  }
);
