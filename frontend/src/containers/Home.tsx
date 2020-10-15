import React from "react";
import { Button, Container } from "@material-ui/core";
import { useFirebase } from "../services/AuthService/Firebase";

const Home = () => {
  const { signOut } = useFirebase();
  return (
    <Container>
      <h2>Welcome</h2>
      <Button onClick={() => signOut()}> Logout</Button>
    </Container>
  );
};

export default Home;
