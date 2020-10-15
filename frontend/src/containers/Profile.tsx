import React from "react";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFirebase } from "../services/AuthService/Firebase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minHeight: "90vh" },
    title: {
      marginTop: 30,
      marginBottom: 30,
    },
  })
);

const Profile = () => {
  const classes = useStyles();
  const { loading, user } = useFirebase();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Container fixed maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Profile
      </Typography>
      <Typography variant="h5">Email: {user.email}</Typography>
    </Container>
  );
};

export default Profile;
