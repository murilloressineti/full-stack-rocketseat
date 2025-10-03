import axios from "axios";

export const api = axios.create({
  baseURL: "https://refund-2-0-api-deploy.onrender.com",
});
