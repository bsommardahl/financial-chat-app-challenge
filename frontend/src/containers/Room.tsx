import React from "react";
import { useParams } from "react-router";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import RoomSidebar from "../components/Room/Sidebar";
import RoomMessages from "../components/Room/Messages";
import MessageInput from "../components/Room/MessageInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { maxHeight: "90vh" },
    title: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    chat: {
      display: "flex",
      height: "78vh",
      border: "2px solid",
      marginBottom: theme.spacing(2),
    },
    chatMain: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
    },
  })
);

const Room = () => {
  const classes = useStyles();
  const { roomName } = useParams<{ roomName: string }>();

  const sendMessage = (message: string) => {
    console.log("message", message);
  };

  return (
    <div className={classes.root}>
      <Container fixed>
        <Typography variant="h3" className={classes.title}>
          Room {roomName}
        </Typography>
      </Container>
      <div className={classes.chat}>
        <RoomSidebar />
        <div className={classes.chatMain}>
          <RoomMessages />
          <MessageInput onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Room;
