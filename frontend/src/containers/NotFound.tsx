import React from "react";
import { Container } from "@material-ui/core";

const NotFound = () => (
  <Container>
    <h2>Route not found</h2>
    <h5>
      Back to <a href="/">home</a>
    </h5>
  </Container>
);

export default NotFound;
