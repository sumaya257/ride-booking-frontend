import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Request interceptor – attach token simply
axiosInstance.interceptors.request.use((config) => {
  const authString = localStorage.getItem("auth");
  if (authString) {
    const auth = JSON.parse(authString);
    if (auth?.token) {
      // শুধু Authorization header attach করা
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${auth.token}`;
    }
  }
  return config;
});

// ✅ Response interceptor – 401 redirect
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
