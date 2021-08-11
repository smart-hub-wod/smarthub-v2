import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";
import firebase from "firebase/app";

export default function AdminRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const [admin, setAdmin] = useState(true);
  const adminRef = firebase.firestore().collection("users").doc("admins");

  function getAdmin() {
    adminRef.get().then((doc) => {
      setAdmin(doc.data().accounts.includes(currentUser.email));
      //   if () {
      //     setAdmin(true);
      //     console.log(admin, "ADMIN IS HEER");
      //   }
      console.log("in the function", currentUser.email, admin);
      console.log(doc.data().accounts.includes(currentUser.email));
    });
  }

  useEffect(() => {
    getAdmin();
    console.log(admin);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        return admin === true ? <Component {...props} /> : <Redirect to="/dashboard" />;
      }}
    ></Route>
  );
}
