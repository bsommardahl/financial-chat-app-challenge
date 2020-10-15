import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import socketIOClient from "socket.io-client";
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
  const [, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const sendMessage = (message: string) => {
    console.log("message", message);
  };

  useEffect(() => {
    const client = socketIOClient(process.env.REACT_APP_BACKEND_URL!);
    setSocket(client);
    client.on("connect", () => {
      console.log("Connected");

      client.emit("hello", {
        roomName,
      });
    });
    client.on("exception", (data: any) => {
      console.log("event", data);
    });
    client.on("answer-hello", (data: any) => {
      console.log("answer-hello", data);
    });
    client.on("disconnect", () => {
      console.log("Disconnected");
    });

    return () => {
      client.disconnect();
    };
  }, [roomName]);

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
