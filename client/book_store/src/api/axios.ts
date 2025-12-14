import axios from 'axios';

const api: Axios.AxiosInstance = axios.create({
  baseURL: 'http://localhost:8800/api', 
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Session expired or invalid cookie');    
    }
    return Promise.reject(error);
  }
);

export default api;