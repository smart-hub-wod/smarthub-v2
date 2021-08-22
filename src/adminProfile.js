import React, { useRef } from "react";
import { useAuth } from "./contexts/AuthContext.js";
import firebase from "./firebase";

export default function AdminProfile() {
  const adminRef = firebase.firestore().collection("users").doc("admins");
  const { currentUser } = useAuth();
  const nameRef = useRef();
  const descriptionRef = useRef();

  function handleSubmit() {
    adminRef.update({
      [`profiles.${currentUser.email.split(".")[0]}`]: {
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        profilepic: currentUser.photoUrl ? currentUser.photoUrl : "../defaultpfp.png", // this would be the src attribute in rendering
      },
    });
  }

  return (
    <div>
      <h1> admin profile page </h1>
    </div>
  );
}
