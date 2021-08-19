import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import firebase from "firebase/app";
import ReactDOM from "react-dom";
import { useAuth } from "./contexts/AuthContext.js";
import { Shield, ShieldLockFill } from "react-bootstrap-icons";

export default function Checkout() {
  // const [{ isPending }] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  // const [usedPromos, setUsedPromos] = useState([]);
  const { currentUser } = useAuth();
  const promoRef = useRef();

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const cartref = firebase.firestore().collection("users").doc(currentUser.uid);
  const coderef = firebase.firestore().collection("promo-codes");

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    console.log("payment complete");
    CompleteTransaction();
    console.log(actions.order.capture());
    return actions.order.capture();
  };

  function CompleteTransaction() {
    console.log("done");
  }

  function getCartTotal() {
    setLoading(true);
    cartref
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCartTotal(doc.data().cartTotal);
          // setUsedPromos(doc.data().promos);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
  }

  function handlePromo(e) {
    e.preventDefault();
    console.log("applying", promoRef.current.value);
    coderef
      .doc(promoRef.current.value)
      .get()
      .then((doc) => {
        if (doc.exists) {
          cartref.get().then((cart) => {
            if (cart.data().promos.includes(promoRef.current.value)) {
              console.log("you've already used this code");
            } else {
              if (doc.data().type === "dollar-off") {
                console.log(-1 * doc.data().value);
                cartref
                  .update({
                    cartTotal: firebase.firestore.FieldValue.increment(-1 * doc.data().value),
                    promos: firebase.firestore.FieldValue.arrayUnion(promoRef.current.value),
                  })
                  .then(() => {
                    window.location.reload();
                  });
              } else if (doc.data().type === "percent-off") {
                console.log(Math.round(-1 * doc.data().value * cart.data().cartTotal * 100) / 100);
                cartref
                  .update({
                    cartTotal: firebase.firestore.FieldValue.increment(-1 * doc.data().value * cart.data().cartTotal),
                    promos: firebase.firestore.FieldValue.arrayUnion(promoRef.current.value),
                  })
                  .then(() => {
                    window.location.reload();
                  });
              } else {
                cartref
                  .update({
                    cartTotal: 0,
                    promos: firebase.firestore.FieldValue.arrayUnion(promoRef.current.value),
                  })
                  .then(() => {
                    CompleteTransaction();
                  });
              }
            }
          });
        }
      });
  }

  useEffect(() => {
    getCartTotal();
  }, []);

  if (loading) {
    return <h1 className="text-shblue mt-4"> Loading... </h1>;
  }

  return (
    <>
      <div className="text-center mx-5 p-4">
        <h1 className="text-shblue mt-4"> Checkout </h1>
        <div className="row align-items-start">
          <div className="col mt-4 pr-5">
            <h5 className="text-shblue mb-2">Your total is: ${cartTotal}</h5>
            <ShieldLockFill size={30} />
            <p className="px-4 mt-1">Complete your transaction using secure payment offered by Paypal using buttons on the right. Once completed courses will be available for your child.</p>
            <p className="px-4 mt-1">All prices include tax.</p>
          </div>
          <div className="col mt-4">
            {" "}
            {cartTotal <= 0 || cartTotal === undefined ? <h3 className="text-shblue">Your cart is empty! Add courses to your cart before checking out!</h3> : <PayPalButton createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)} />}
            <Form onSubmit={handlePromo} className="mb-3">
              <Form.Group id="text" className="mb-3 mt-4 form-floating">
                <Form.Control type="text" ref={promoRef} className="form-control" placeholder="Enter your promo code" id="InputPromo" aria-describedby="promocode" required />
                <Form.Label for="InputPromo" className="form-label floatingInput">
                  Have a promo code? Enter it here!
                </Form.Label>
              </Form.Group>
              <Button bsPrefix="button-sh" className="mt-1" type="submit">
                Apply Discount
              </Button>
            </Form>
          </div>
        </div>
        <Link to="/cart">
          <Button bsPrefix="button-sh">Return to Cart</Button>
        </Link>
        {/* {isPending ? <div className="spinner" /> : null}
        <PayPalButtons style={{ layout: "horizontal" }} /> */}
      </div>
    </>
  );
}
