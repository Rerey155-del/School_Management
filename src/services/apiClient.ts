import axios from 'axios';

// Konfigurasi instance Axios untuk base URL API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ganti dengan URL backend sesungguhnya di .env
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // Timeout request
});

// Anda bisa menambahkan interceptor untuk Auth Token di sini:
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
