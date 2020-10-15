import React from "react";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import JoinChatRoom from "../components/Home/JoinChatRoom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minHeight: "90vh" },
    title: {
      marginTop: 30,
      marginBottom: 30,
    },
  })
);

const Home = () => {
  const classes = useStyles();
  return (
    <Container fixed maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Welcome
      </Typography>
      <JoinChatRoom />
    </Container>
  );
};

export default Home;
