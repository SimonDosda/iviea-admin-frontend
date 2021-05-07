import React from "react";
import { PageProps, navigate } from "gatsby";
import { isLoggedIn, login } from "../services/auth";
import useForm from "../utils/useForm";
import { LoginT } from "../models/user";

const LoginPage: React.FC<PageProps> = () => {
  if (isLoggedIn()) {
    navigate("/");
  }

  const { values, updateValues } = useForm<LoginT>({
    email: "",
    password: "",
  });

  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={async (event) => {
          event.preventDefault();
          const loggedIn = await login(values);
          if (loggedIn) {
            navigate("/");
          }
        }}
      >
        <label>
          Email
          <input type="text" name="email" id="email" value={values.email} onChange={updateValues} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={updateValues}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  );
};

export default LoginPage;
