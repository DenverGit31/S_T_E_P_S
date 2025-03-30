import axios from "axios";

const axiosInstance = (token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  return axios.create({
    baseURL: "http://localhost:8080",
    headers,
  });
};

export default axiosInstance;
