import { Button, Container } from "react-bootstrap";
import apiClient from "../api/apiClient";
import { useState } from "react";
import type { User } from "../types/User";
import { toast } from "react-toastify";
import * as Sentry from "@sentry/react";

const LoginPage = () => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const trylogin = () => {
    apiClient
      .post("/login", user)
      .then((res) => {
        localStorage.setItem("credentials", JSON.stringify(user));
        if (res.status == 200) {
          toast.success("sikeres torles");
        }
      })
      .catch(() => Sentry.captureException);
  };
  return (
    <Container>
      <h2>username</h2>
      <input
        type="text"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <h2>password</h2>
      <input
        type="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button onClick={trylogin}>login</Button>
    </Container>
  );
};
export default LoginPage;
