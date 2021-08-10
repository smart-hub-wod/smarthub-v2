import React from "react";
import {
  useState,
  useEffect,
} from "react";
import firebase from "./firebase";
import { useAuth } from "./contexts/AuthContext.js";
import {
  Card,
  Button,
} from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Cart() {
  // const [cart, setCart] = useState([]);
  const [courses, setCourses] =
    useState([]);
  const [loading, setLoading] =
    useState(false);
  const [price, setPrice] = useState(0);
  const { currentUser } = useAuth();
  const cartref = firebase
    .firestore()
    .collection("users")
    .doc(currentUser.uid);

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
          setPrice(
            doc.data().cartTotal
          );
        }
      })
      .catch((error) => {
        console.log(
          "Error getting document:",
          error
        );
      });
    setLoading(false);
  }

  const deleteCourse = () => {
    console.log("deleting");
  };

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return (
      <h1 className="text-shblue pt-3">
        Loading...
      </h1>
    );
  }

  return (
    <div>
      <div className="text-center mb-5 mx-5">
        <h1 className="text-shblue mt-4">
          Cart Summary
        </h1>
        {Object.keys(courses).map(
          (kid) => {
            if (
              courses[kid].length > 0
            ) {
              return (
                <>
                  <h5>{kid}</h5>
                  <ChildCart
                    kidCourses={
                      courses[kid]
                    }
                    childName={kid}
                    delete={
                      deleteCourse
                    }
                  />
                </>
              );
            } else {
              return (
                <>
                  <h5>{kid}</h5>
                  <p>
                    No courses found!
                  </p>
                </>
              );
            }
          }
        )}
        <div className="mx-5">
          <h1 className="text-shblue my-4 mr-5 text-end">
            Total: ${price}
          </h1>
          <Link to="/checkout">
            <Button bsPrefix="button-sh">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChildCart(props) {
  const courseref = firebase
    .firestore()
    .collection("courses");
  const c = props.kidCourses;
  const docInfo = [];
  c.map((course) => {
    courseref
      .doc(course)
      .get()
      .then((doc) => {
        docInfo.push(doc.data().title);
      });
  });
  // console.log(docInfo)

  function titleMaker(title) {
    let finished = title.split("-");
    finished.map((word, index) => {
      finished[index] =
        word.charAt(0).toUpperCase() +
        word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  return (
    <>
      {c.map((course) => {
        return (
          <Card className="pt-3 mx-5 mb-3">
            <div className="d-flex justify-content-between">
              <h3 className="text-shblue mx-3">
                {titleMaker(course)}
              </h3>
              <XCircle
                onClick={props.delete}
                className="float-end text-shblue mx-3"
                size={30}
              />
            </div>
            <div className="row">
              <Link
                to={`/course-listing/${course}`}
              >
                <p className="text-start mx-3">
                  View course info
                </p>{" "}
              </Link>
            </div>
          </Card>
        );
      })}
    </>
  );
  // return ("Hello")
}
