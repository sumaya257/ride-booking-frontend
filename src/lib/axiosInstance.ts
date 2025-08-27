import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // আপনার backend base url
  withCredentials: true, // যদি cookie/token লাগে
});

export default axiosInstance;
