import axios from "axios";
const devMode = import.meta.env.DEV;
const prodApi = import.meta.env.VITE_api;
const apiBaseURL = !devMode ? "http://localhost:8787/api/v1" : prodApi;
const token = `Bearer ${localStorage.getItem("medium-jwt-token")}`;
const api = axios.create({
  baseURL: apiBaseURL,
});

const apiWithToken = axios.create({
  baseURL: apiBaseURL,
  headers: {
    Authorization: token,
  },
});
export { apiWithToken };
export default api;
