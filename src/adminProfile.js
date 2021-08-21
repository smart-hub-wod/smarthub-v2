import React from "react";

export default function AdminProfile() {
  const adminRef = firebase.firestore().collection("users").doc("admins");

  adminRef.update({
    [`profiles.${currentUser.email.split(".")[0]}`]: {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    },
  });
  return (
    <div>
      <h1> admin profile page </h1>
    </div>
  );
}
