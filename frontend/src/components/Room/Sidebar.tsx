import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "white",
      background: theme.palette.grey.A700,
      width: "225px",
      overflowY: "scroll",
    },
    title: {
      borderBottom: "1px solid",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      textAlign: "center",
    },
    text: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      textAlign: "center",
    },
  })
);

const RoomSidebar = () => {
  const classes = useStyles();
  const activeUsers: string[] = [];

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Active users
      </Typography>
      {activeUsers.map((username) => (
        <Typography className={classes.text}>{username}</Typography>
      ))}
    </div>
  );
};

export default RoomSidebar;
