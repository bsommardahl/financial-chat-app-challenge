import React, { useEffect, useMemo, useState } from "react";
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
import { useFirebase } from "../services/AuthService/Firebase";
import { RoomData } from "../types/RoomData";

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
  const { user } = useFirebase();
  const { roomName } = useParams<{ roomName: string }>();
  const [roomData, setRoomData] = useState<RoomData>({
    roomName,
    messages: [],
    users: [],
  });
  const basicInformation = useMemo(
    () => ({
      roomName,
      username: user?.email,
    }),
    [roomName, user]
  );
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  const sendMessage = (message: string) => {
    socket?.emit("new-message", { message, ...basicInformation });
  };

  useEffect(() => {
    const client = socketIOClient(process.env.REACT_APP_BACKEND_URL!);
    setSocket(client);
    client.on("connect", () => {
      console.log("Connected");

      client.emit("user-connected", basicInformation);
    });
    client.on("exception", (data: any) => {
      console.log("Exception", data);
    });
    client.on("disconnect", () => {
      console.log("Disconnected");
    });
    client.on("room-data", (data: RoomData) => {
      setRoomData(data);
    });

    return () => {
      client.disconnect();
    };
  }, [basicInformation]);

  return (
    <div className={classes.root}>
      <Container fixed>
        <Typography variant="h3" className={classes.title}>
          Room {roomName}
        </Typography>
      </Container>
      <div className={classes.chat}>
        <RoomSidebar users={roomData.users} />
        <div className={classes.chatMain}>
          <RoomMessages messages={roomData.messages} />
          <MessageInput onSubmit={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Room;
