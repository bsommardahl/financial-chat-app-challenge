import React, { useState } from "react";
import {
  Button,
  createStyles,
  makeStyles,
  OutlinedInput,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexShrink: 0,
      //   marginTop: "16px",
      padding: "24px",
    },
    form: { display: "flex", flexGrow: 1, marginRight: "16px" },
  })
);

interface Props {
  onSubmit: (message: string) => void;
}

const MessageInput = ({ onSubmit: doSubmit }: Props) => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doSubmit(message);
  };

  return (
    <div className={classes.root}>
      <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
        <OutlinedInput
          placeholder="Message"
          required
          fullWidth
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button
          variant="outlined"
          disabled={!message}
          onClick={() => doSubmit(message)}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
