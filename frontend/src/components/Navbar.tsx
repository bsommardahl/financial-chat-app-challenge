import React from "react";
import {
  AppBar,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useFirebase } from "../services/AuthService/Firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      color: "white",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  const { signOut, isAuthenticated } = useFirebase();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <a href="/" className={classes.link}>
            Financial Chat App
          </a>
        </Typography>
        {isAuthenticated && (
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
