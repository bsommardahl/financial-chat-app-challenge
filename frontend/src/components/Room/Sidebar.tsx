import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { User } from "../../types/User";

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

interface Props {
  users: User[];
}

const RoomSidebar = ({ users }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Active users
      </Typography>
      {users.map(({ username }, idx) => (
        <Typography key={idx} className={classes.text}>
          {username}
        </Typography>
      ))}
    </div>
  );
};

export default RoomSidebar;
