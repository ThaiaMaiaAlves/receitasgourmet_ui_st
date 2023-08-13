import axios from "axios";

// const baseURL = "http://receitasgourmet.duckdns.org:8080"; // production
const baseURL = "http://transcargo.duckdns.org:8000"; // production
// const baseURL = "http://localhost:80"; // development
const version = 'v1';

const api = axios.create({
  baseURL
});

export default api;