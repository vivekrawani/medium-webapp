import axios from "axios";
const devMode = import.meta.env.DEV;
const prodApi = import.meta.env.VITE_api;
const apiBaseURL = devMode ? "http://localhost:8787/api/v1" : prodApi;

const api = axios.create({
  baseURL: apiBaseURL,
});
export default api;
