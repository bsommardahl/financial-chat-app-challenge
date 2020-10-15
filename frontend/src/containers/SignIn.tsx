import React from "react";
import { Button, Container } from "@material-ui/core";
import { useFirebase } from "../services/AuthService/Firebase";
import GoogleLogo from "../assets/btn_google_light_normal_ios.svg";

const SignIn = () => {
  const { signInWithGoogle } = useFirebase();
  return (
    <Container>
      <h2>Sign In</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => signInWithGoogle()}
        startIcon={<img src={GoogleLogo} alt="Google Logo" />}
      >
        Sign in with Google
      </Button>
    </Container>
  );
};

export default SignIn;
