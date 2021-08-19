import React from "react";
import { useParams } from "react-router";
import firebase from "firebase/app";
import { Card, Image, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext.js";
import logo from "./assets/certificate-logo.png";
import { Link } from "react-router-dom";

export function Certificate() {
  let { child, course } = useParams();
  const [kid, setKid] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);

  function getChild() {
    setLoading(true);
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setKid(doc.data()["children"][child]);
          setName(doc.data()["children"][child]["name"]);
          console.log(child);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }

  function titleMaker(title) {
    let finished = title.split("-");
    finished.pop();
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  useEffect(() => {
    getChild();
  }, []);

  if (loading) {
    return <h1 className="text-shblue">Loading...</h1>;
  }

  return (
    <>
      <CertificateCard child={name} course={titleMaker(course)} />
      <div className="d-flex justify-content-center">
        <Link to={`/certificate-print/${name}/${titleMaker(course)}`}>
          <Button bsPrefix="button-sh">View Print Version</Button>
        </Link>
      </div>
    </>
  );
}

export function CertificateCard(props) {
  return (
    <div className="text-center">
      <Card className="mx-5 my-5 py-5">
        <div className="d-flex justify-content-center">
          <img src={logo} style={{ width: "15%" }} className="d-inline-block align-top" alt="Smart Hub logo" />
        </div>
        <Card.Title className="text-shblue">
          <h1 style={{ fontSize: 70 }}>Certificate</h1>
          <h3 style={{ fontSize: 40 }}>of Completion</h3>
        </Card.Title>
        <div className="d-flex justify-content-center">
          {" "}
          <hr style={{ color: "#fe5c36", height: 7, borderWidth: 0, opacity: 100, width: "10%" }} />
        </div>
        <p>This certificate is awarded to</p>
        <h1 className="text-shblue">{props.child}</h1>
        <p>
          who has successfully completed <br />
          <span style={{ color: "#fe5c36", fontWeight: "bold" }}>{props.course}</span>
        </p>
      </Card>
    </div>
  );
}
