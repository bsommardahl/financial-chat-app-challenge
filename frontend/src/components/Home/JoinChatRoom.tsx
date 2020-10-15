import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "40%",
      margin: "auto",
    },
    title: {
      marginBottom: 30,
    },
    cardActions: {
      justifyContent: "center",
    },
    form: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const JoinChatRoom = () => {
  const classes = useStyles();
  const history = useHistory();
  const [chatRoom, setChatRoom] = useState("");

  const goToRoom = () => history.push(`/rooms/${chatRoom}`);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToRoom();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          color="textSecondary"
          gutterBottom
          className={classes.title}
        >
          Join a Chat Room
        </Typography>
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
          <TextField
            id="room-name"
            label="Room Name"
            variant="outlined"
            required
            value={chatRoom}
            onChange={(event) => setChatRoom(event.target.value)}
          />
        </form>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={goToRoom}
        >
          Join
        </Button>
      </CardActions>
    </Card>
  );
};

export default JoinChatRoom;
