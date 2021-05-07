import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.GATSBY_API_URL}`,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

export default api;
