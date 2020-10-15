import React from "react";
import {
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFirebase } from "../services/AuthService/Firebase";
import GoogleLogo from "../assets/btn_google_light_normal_ios.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minHeight: "90vh" },
    title: {
      marginTop: 30,
      marginBottom: 30,
    },
  })
);

const SignIn = () => {
  const classes = useStyles();
  const { signInWithGoogle } = useFirebase();
  return (
    <Container fixed maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Sign In
      </Typography>
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
