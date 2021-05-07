import { LoginT, StrapiUser, User } from "../models/user";
import api from "./api";

interface LoginData {
  data: {
    token: string;
    user: StrapiUser;
  };
}

export const getUser = (): User =>
  window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : null;

const setUser = (user: User): void => window.localStorage.setItem("user", JSON.stringify(user));

export const login = async ({ email, password }: LoginT): Promise<boolean> => {
  const { status, data } = await api.post<LoginData>("/admin/login", {
    email,
    password,
  });
  if (status !== 200 || !data) {
    console.error(data);
    return false;
  }
  const user = {
    firstName: data.data.user.firstname,
    lastName: data.data.user.lastname,
    email: data.data.user.email,
    token: data.data.token,
  };
  setUser(user);
  return true;
};

export const isLoggedIn = (): boolean => {
  const user = getUser();
  return !!user?.token;
};

export const logout = (): void => {
  setUser(null);
};
