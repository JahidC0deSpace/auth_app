import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Matches your backend port
});

// Interceptor to attach the JWT token to every request
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
