import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "./contexts/AuthContext.js";
import { Card, Button, Alert } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Cart() {
  // const [cart, setCart] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const { currentUser } = useAuth();
  const cartref = firebase.firestore().collection("users").doc(currentUser.uid);

  async function getCart() {
    setLoading(true);
    await cartref
      .get()
      .then((doc) => {
        if (doc.exists) {
          // (doc.data().cart).map((course) => {
          //     courseref.doc(course).get().then((doc) => {
          //         if (doc.exists) {
          //             setLoading(true)
          //             courseInfo.push(doc.data())
          //             console.log(doc.data())
          //             setLoading(false)
          //         }
          //     })
          //     setCourses(courseInfo)
          // })
          setCourses(doc.data().cart);
          setPrice(doc.data().cartTotal);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }

  const deleteCourse = (id, child, prices) => {
    console.log(`deleting ${id} for ${child}`);
    let pricedecrease = prices - price < 0 ? prices : price;
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        [`cart.${child}`]: firebase.firestore.FieldValue.arrayRemove(id),
        ["cartTotal"]: firebase.firestore.FieldValue.increment(-1 * pricedecrease),
      })
      .then(() => {
        console.log("Document successfully deleted!");
        getCart();
      });
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <h1 className="text-shblue pt-3">Loading...</h1>;
  }

  return (
    <div>
      <div className="text-center mb-5 mx-5">
        <h1 className="text-shblue mt-4">Cart Summary</h1>
        {Object.keys(courses).map((kid) => {
          if (courses[kid].length > 0) {
            return (
              <>
                <h5 className="mt-4">{kid}</h5>
                <ChildCart kidCourses={courses[kid]} childName={kid} delete={deleteCourse} />
              </>
            );
          } else {
            return (
              <>
                <h5 className="mt-4">{kid}</h5>
                <p>No courses found!</p>
              </>
            );
          }
        })}
        <div className="mx-5">
          <h1 className="text-shblue mt-4 mr-5 text-end">Total: ${price}</h1>
          <p className="text-end">All prices include tax.</p>
          <Link to="/checkout">
            <Button bsPrefix="button-sh">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChildCart(props) {
  const courseref = firebase.firestore().collection("courses");
  const c = props.kidCourses;

  const [prices, setPrices] = useState([0]);
  let docInfo = [];
  function getPrices() {
    docInfo = [];
    c.map((course) => {
      courseref
        .doc(course)
        .get()
        .then((doc) => {
          docInfo.push(doc.data().title);
          console.log(doc.data().price);
        });
    });
    setPrices(docInfo);
  }

  function setNewPrice(pric, index) {
    const pri = prices;
    pri[index] = pric;
    setPrices(pri);
  }

  // console.log(docInfo)

  function titleMaker(title) {
    let finished = title.split("-");
    finished.pop();
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <>
      {c.length > 0 &&
        c.map((course, index) => {
          courseref
            .doc(course)
            .get()
            .then((doc) => {
              setNewPrice(doc.data().price, index);
            });
          return (
            <Card className="py-3 mx-5 mb-3">
              <div className="d-flex justify-content-between">
                <h3 className="text-shblue mx-3">{titleMaker(course)}</h3>
                <div>
                  <span className="text-shblue fs-3 fw-bold">${prices[index]}</span>
                  <span>
                    <XCircle onClick={() => props.delete(course, props.childName, prices[index])} style={{ cursor: "pointer" }} className="float-end text-shblue mx-3" size={30} />
                  </span>
                </div>
              </div>
              <div className="row">
                <Link to={`/course-listing/${course}`}>
                  <p className="text-start mx-3">View course info</p>{" "}
                </Link>
              </div>
            </Card>
          );
        })}
    </>
  );
  // return ("Hello")
}
