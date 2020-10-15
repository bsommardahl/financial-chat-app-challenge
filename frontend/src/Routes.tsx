import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import NotFound from "./containers/NotFound";
import SignIn from "./containers/SignIn";
import { useFirebase } from "./services/AuthService/Firebase";

const Routes = () => {
  const { isAuthenticated } = useFirebase();
  return (
    <Switch>
      {isAuthenticated && <Redirect from="/sign-in" to="/" />}
      <Route exact path="/sign-in" component={SignIn} />
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
};
export default Routes;
