import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router";
import firebase from "./firebase";
import { useAuth } from "./contexts/AuthContext.js";
import { Link } from "react-router-dom";

export default function StudentDash() {
  let { id } = useParams();
  const [child, setChild] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const userRef = firebase.firestore().collection("users").doc(currentUser.uid);

  async function getChild() {
    setLoading(true);
    await userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setChild(doc.data()["children"][id]);
          console.log(child);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }

  useEffect(() => {
    getChild();
    console.log(child);
  }, []);

  function titleMaker(title) {
    let finished = title.split("-");
    finished.pop();
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  if (loading) {
    return <h1 className="text-shblue pt-3 text-center">Loading...</h1>;
  }

  console.log(child);
  return (
    <>
      <Card className="card m-5 p-5">
        <Card.Body>
          <h1 className="text-center text-shblue">My Dashboard</h1>
          <h6>Welcome!</h6>
          <h1 className="text-shblue">{child ? child.name : "Loading"}</h1>
          <h3 className="text-shblue mt-5">My Courses</h3>
          <h5 className="mt-4">In Progress</h5>
          {child ? (
            child.courses.length > 0 ? (
              child.courses.map((course) => {
                return (
                  <Card className="p-3 is-shblue mb-3 text-white w-50">
                    <Card.Body>
                      <h3>{titleMaker(course)}</h3>
                      <Link to={`/lesson/${course}/${id}`}>
                        <Button bsPrefix="button-sh" className="mt-2">
                          Continue to course!
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <p>No in progress courses!</p>
            )
          ) : (
            <h1>Loading</h1>
          )}
          <h5 className="mt-5">Completed</h5>
          {child ? (
            child.courses["completed"] ? (
              child.courses["completed"].map((course) => {
                return (
                  <Card className="p-3 is-shblue mb-3 text-white w-50">
                    <Card.Body>{course}</Card.Body>
                  </Card>
                );
              })
            ) : (
              <p>No completed courses!</p>
            )
          ) : (
            <h1>Loading</h1>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
