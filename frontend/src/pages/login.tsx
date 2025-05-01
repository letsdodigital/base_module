"use client";

import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Spinner state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Show spinner immediately

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid username or password");
      setLoading(false); // Hide spinner if login fails
    } else {
      router.push("/");
    }
  };

  return (
    <Segment padded="very" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Header as="h1" textAlign="center">
        Login
      </Header>
      {loading && <Spinner message="Logging in..." />}
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
