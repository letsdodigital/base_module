import { signIn } from "next-auth/react";
import { Button, Container, Header } from "semantic-ui-react";

const LoginPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "50px" }}>
      <Header as="h1" color="teal">
        Login
      </Header>
      <p>You must log in to access this page.</p>
      <Button color="blue" onClick={() => signIn()}>
        Sign In
      </Button>
    </Container>
  );
};

// Mark this page as public
LoginPage.public = true;

export default LoginPage;
