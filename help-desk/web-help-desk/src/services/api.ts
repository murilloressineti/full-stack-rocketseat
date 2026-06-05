import axios from "axios";

export const api = axios.create({
  baseURL: "URL_DO_DEPLOY_AQUI",
});

// O Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Pega o token que salvou no login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
