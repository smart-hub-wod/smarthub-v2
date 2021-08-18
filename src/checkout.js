import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import firebase from "firebase/app";
import ReactDOM from "react-dom";
import { useAuth } from "./contexts/AuthContext.js";
import { Shield, ShieldLockFill } from "react-bootstrap-icons";

export default function Checkout() {
  // const [{ isPending }] = usePayPalScriptReducer();
  const [loading, setLoading] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { currentUser } = useAuth();

  const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
  const cartref = firebase.firestore().collection("users").doc(currentUser.uid);

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
    console.log(actions.order.capture());
    return actions.order.capture();
  };

  function getCartTotal() {
    setLoading(true);
    cartref
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCartTotal(doc.data().cartTotal);
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setLoading(false);
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
          </div>
          <div className="col mt-4"> {cartTotal === 0 ? <h3 className="text-shblue">Your cart is empty! Add courses to your cart before checking out!</h3> : <PayPalButton createOrder={(data, actions) => createOrder(data, actions)} onApprove={(data, actions) => onApprove(data, actions)} />}</div>
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
