"use client";

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Save tokens to localStorage or cookies
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      // Redirect to a protected page
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Segment padded="very" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Header as="h1" textAlign="center">
        Login
      </Header>
      <Form onSubmit={handleLogin} error={!!error}>
        <Form.Input
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Message error content={error} />}
        <Button primary fluid type="submit">
          Login
        </Button>
      </Form>
    </Segment>
  );
};

export default Login;
