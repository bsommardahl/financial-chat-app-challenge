import React from "react";
import { useParams } from "react-router";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minHeight: "90vh" },
    title: {
      marginTop: 30,
      marginBottom: 30,
    },
  })
);

const Room = () => {
  const classes = useStyles();
  const { roomName } = useParams<{ roomName: string }>();
  return (
    <Container fixed maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Room {roomName}
      </Typography>
    </Container>
  );
};

export default Room;
