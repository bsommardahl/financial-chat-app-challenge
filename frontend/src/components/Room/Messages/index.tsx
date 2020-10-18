import React, { useEffect } from "react";
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

interface Props {
  messages: Message[];
}

const RoomMessages = ({ messages }: Props) => {
  const classes = useStyles();

  useEffect(() => {
    document.getElementById(`message-${messages.length - 1}`)?.scrollIntoView();
  });

  return (
    <div className={classes.messages}>
      {messages.map(({ createdAt, message, user: { username } }, idx) => (
        <ChatMessage
          key={idx}
          id={`message-${idx}`}
          date={createdAt}
          message={message}
          sender={username}
        />
      ))}
    </div>
  );
};

export default RoomMessages;
