import React from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { useFirebase } from "../services/AuthService/Firebase";

const PrivateRoute = (props: RouteProps) => {
  const { loading, isAuthenticated } = useFirebase();
  if (loading) return null;

  return isAuthenticated === true ? (
    <Route {...props} />
  ) : (
    <Redirect to="/sign-in" />
  );
};

export default PrivateRoute;
