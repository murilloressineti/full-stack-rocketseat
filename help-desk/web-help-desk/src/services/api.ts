import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-help-desk-deploy.onrender.com"
});

// O Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pega o token que salvou no login

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
