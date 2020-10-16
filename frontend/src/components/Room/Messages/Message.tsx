import React from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    meta: {
      color: theme.palette.grey[500],
    },
    sender: {
      marginRight: theme.spacing(1),
      fontWeight: "bold",
      color: theme.palette.grey[700],
    },
    time: {},
    message: {},
  })
);

interface Props {
  sender: string;
  date: Date;
  message: string;
}

const ChatMessage = ({ date, message, sender }: Props) => {
  const classes = useStyles();
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));

  return (
    <div className={classes.root}>
      <Typography className={classes.meta}>
        <span className={classes.sender}>{sender}</span>
        <span className={classes.time}>{formattedTime}</span>
      </Typography>
      <Typography className={classes.message}>{message}</Typography>
    </div>
  );
};

export default ChatMessage;
