import React from "react";
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

const NotFound = () => {
  const classes = useStyles();
  return (
    <Container fixed maxWidth="md" className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Route not found
      </Typography>
      <Typography variant="h5">
        Back to <a href="/">home</a>
      </Typography>
    </Container>
  );
};

export default NotFound;
