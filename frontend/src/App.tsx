import React from "react";
import "./App.css";
import {
  Container,
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { Router } from "react-router";
import history from "./history";
import Routes from "./Routes";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Router history={history}>
          <Routes />
        </Router>
      </Container>
      <footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} | Created by Renan Zelaya
      </footer>
    </ThemeProvider>
  );
};

export default App;
