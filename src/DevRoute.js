import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";

export default function DevRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.email === "dev@smarthub.ca" ? <Component {...props} /> : <Redirect to="/dashboard" />;
      }}
    ></Route>
  );
}
