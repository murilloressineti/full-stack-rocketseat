import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// O Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pega o token que salvou no login

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
