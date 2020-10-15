import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ChatMessage from "./Message";
import { Message } from "../../../types/Message";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messages: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      overflowY: "scroll",
      borderBottom: "2px solid",
    },
  })
);

const RoomMessages = () => {
  const classes = useStyles();
  const messages: Message[] = [];

  return (
    <div className={classes.messages}>
      {messages.map(({ createdAt, message, username }) => (
        <ChatMessage date={createdAt} message={message} sender={username} />
      ))}
    </div>
  );
};

export default RoomMessages;
