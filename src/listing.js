import React, { useState, useEffect } from "react";
// import firebase from './firebase'
import firebase from "firebase/app";
import "firebase/storage";
import { useParams } from "react-router";
import { Button, Alert, Spinner, Image, Badge, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";

export default function Listing() {
  let { id } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [kids, setKids] = useState();
  const [url, setUrl] = useState("");
  const [confirm, setConfirm] = useState();
  var storageRef = firebase.storage();
  //var coverRef = firebase.storage().ref(`${id}/software-engineering.jpeg`);

  const courseref = firebase.firestore().collection("courses").doc(id);
  const { currentUser } = useAuth();
  const cartref = currentUser ? firebase.firestore().collection("users").doc(currentUser.uid) : undefined;

  function getCourse() {
    setLoading(true);
    let defaultIMG = false;
    courseref
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCourse(doc.data());
          defaultIMG = doc.data().defaultCover;
        }
      })
      .then(() => {
        if (currentUser) {
          cartref.get().then((kid) => {
            if (kid.exists) {
              setKids(kid.data());
            }
            // setLoading(true);
            // console.log(course);
            // var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
            // coverRef.getDownloadURL().then((URL) => {
            //   setUrl(URL);
            // });
            // setLoading(false);
          });
        }
        //console.log(kids, 'Kids')
      })
      .then(() => {
        setLoading(true);
        console.log(defaultIMG);
        if (!defaultIMG) {
          var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
          coverRef.getDownloadURL().then((URL) => {
            setUrl(URL);
          });
        } else {
          setUrl("../defaultcourseimage.png");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }

  function titleMaker(title) {
    let finished = title.split("-");
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  function addCourse() {
    const nameBar = document.querySelector("#nameSelect");
    console.log(nameBar.value);
    // cartref.update({
    //     cart: firebase.firestore.FieldValue.arrayUnion(course.id)
    // });

    cartref.get().then((doc) => {
      if (doc.exists) {
        if (!doc.data()["cart"][nameBar.value].includes(course.id)) {
          cartref.update({
            [`cart.${nameBar.value}`]: firebase.firestore.FieldValue.arrayUnion(course.id),
            ["cartTotal"]: firebase.firestore.FieldValue.increment(course.price),
          });
          setConfirm(`Success! Course was added for ${nameBar.value}!`);
        } else {
          setConfirm(`Course has already been added for ${nameBar.value}! Check your cart to purchase!`);
        }
      }
    });
  }

  useEffect(() => {
    getCourse();
  }, []);

  if (loading) {
    return (
      <>
        <h1 className="text-shblue pt-3 text-center">Loading...</h1>
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      </>
    );
  }

  // Course not Found Error Page
  if (course.length === 0) {
    return (
      <>
        <h1 className="text-shblue pt-3 text-center">Course not found</h1>
        <h4 className="text-center text-secondary mb-4">
          See all courses <Link to="/courses">here!</Link>
        </h4>
      </>
    );
  }
  //height="100" width="300"
  return (
    <>
      <div>
        <div className="d-flex justify-content-center">
          <img height="150" className="rounded-pill mt-3" src={url} />
        </div>
        <h1 className="text-center text-shblue mt-3">{course.title}</h1>
        <h4 className="text-center text-secondary mb-4">Estimated Time to Complete: {course.timeline} hours</h4>
      </div>
      <div className="row justify-content-center my-4">
        <div className="col-6 text-white is-shblue p-4 rounded">
          <p>{course.description}</p>
          <h5 className="mt-3">
            Includes {course.modules} Learning Modules{course.sync && " And Live Lessons"}!
          </h5>
          <h6 className="mb-3">Perfect for:</h6>
          {course.grades.map((grade) => {
            return (
              <>
                <Badge bsPrefix="button-sh">{titleMaker(grade)}</Badge>
                <span> </span>
              </>
            );
          })}
          {/* <div class="row justify-content-start mt-3 align-items-center">
            <Image src={course.instructor_pic} className="border border-white" roundedCircle style={{ height: "100px", width: "100px" }} />
            <div className="col-4">
              <h6>Course Instructor:</h6>
              <h4>
                {" "}
                <strong>{course.instructor}</strong>
              </h4>
            </div>
          </div> */}
        </div>
        <div className="col-4 text-center">
          {confirm && <Alert variant="success">{confirm}</Alert>}
          {currentUser ? (
            kids ? (
              <div>
                {kids ? (
                  Object.keys(kids["children"]).length > 0 ? (
                    <select className="form-select mb-3" defaultValue="0" aria-label="Default select example" id="nameSelect">
                      {kids ? (
                        Object.keys(kids["children"]).map((kid) => {
                          return (
                            <option value={kids["children"][kid]["name"]} key={kid}>
                              {kids["children"][kid]["name"]}
                            </option>
                          );
                        })
                      ) : (
                        <h1>Loading</h1>
                      )}
                    </select>
                  ) : (
                    <Alert variant={"primary"}>Add a student to your account to purchase courses!</Alert>
                  )
                ) : (
                  <p>Loading</p>
                )}
                {kids ? (
                  Object.keys(kids["children"]).length > 0 ? (
                    <Button bsPrefix="button-sh" onClick={addCourse}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Button variant="secondary" disabled>
                      Add to Cart
                    </Button>
                  )
                ) : (
                  <p>Loading</p>
                )}
                <p className="text-shblue mt-1">
                  Only <span className="fs-3 fw-bold">${course.price}</span>
                  {course.product && (
                    <span>
                      {" "}
                      +{" "}
                      <a href={course.productlink} target="_blank" rel="noopener noreferrer">
                        additional resource costs
                      </a>
                    </span>
                  )}
                </p>
                <br />
              </div> //
            ) : (
              <h1>Loading...</h1>
            )
          ) : (
            <>
              <div className="mb-3">
                <Alert className="" variant={"primary"}>
                  Login to purchase courses!
                </Alert>
                <Button variant="secondary" disabled>
                  Add to Cart
                </Button>{" "}
              </div>
            </>
          )}
          <Card>
            <Card.Body>
              <div className="row mt-3 align-items-center justify-content-center mb-2">
                <Image src={course.instructor_pic} className="border border-white" roundedCircle style={{ height: "100px", width: "125px" }} />
                <div className="col-5 text-start">
                  <h6>Course Instructor:</h6>
                  <h4>
                    {" "}
                    <strong>{course.instructor}</strong>
                  </h4>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
