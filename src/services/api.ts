import axios from "axios";
import { getUser } from "./auth";

const api = axios.create({
  baseURL: `${process.env.GATSBY_API_URL}`,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

export async function getWithToken<T>(url: string): Promise<T> {
  const user = getUser();
  if (!user) {
    return null;
  }
  const { status, data } = await api.get<T>(url, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  if (status !== 200) {
    console.log(data);
    return null;
  }
  return data;
}

export default api;
