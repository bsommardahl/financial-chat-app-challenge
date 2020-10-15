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
  })
);

const Navbar = () => {
  const classes = useStyles();
  const { signOut, isAuthenticated } = useFirebase();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Financial Chat App
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
