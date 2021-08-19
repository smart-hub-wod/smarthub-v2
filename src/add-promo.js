import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import firebase from "firebase/app";

export default function AddPromo() {
  const promoRef = useRef();
  const emailRef = useRef();
  const typeRef = useRef();
  const valueRef = useRef();
  const [alert, setAlert] = useState();
  const [admins, setAdmins] = useState([]);
  const [promos, setPromos] = useState([]);
  const adminref = firebase.firestore().collection("users").doc("admins");
  const promoref = firebase.firestore().collection("promo-codes");

  const handleSubmit = (e) => {
    e.preventDefault();
    // //console.log(emailRef.current.value);
    promoref.doc(promoRef.current.value).set({
      ["type"]: typeRef.current.value,
      ["codename"]: promoRef.current.value,
      ["value"]: typeRef.current.value !== "free-course" ? valueRef.current.value : 0,
    });
    // //console.log(emailRef.current.value.split(".")[0]);
    setAlert(`Success! ${promoRef.current.value} was added as a promo code, refresh page to see updated list`);
    // document.getElementById("InputEmail").value = "";
    console.log(typeRef.current.value);
    console.log(valueRef.current.value);
    console.log(promoRef.current.value);
  };

  function getCodes() {
    const codes = [];
    promoref
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          codes.push(doc.data());
        });
      })
      .then(() => {
        setPromos(codes);
      });
  }

  function handleRemove(codename) {
    console.log(codename);
    promoref
      .doc(codename)
      .delete()
      .then(() => {
        window.location.reload();
      });
  }

  useEffect(() => {
    getCodes();
  }, []);

  return (
    <>
      <div>
        <Card className="card m-5 p-5">
          <Card.Body>
            <div className="text-center">
              <h1 className="text-shblue mt-4"> Add Promo Codes </h1>
              {alert ? <Alert variant="success">{alert}</Alert> : ""}
              <Form onSubmit={handleSubmit} className="mb-3">
                <Form.Group id="promocode" className="mb-3 mt-4 form-floating">
                  <Form.Control type="text" ref={promoRef} className="form-control" placeholder="Promo Code" id="InputPromo" aria-describedby="promo code name" required />
                  <Form.Label for="InputPromo" className="form-label floatingInput">
                    Promo Codename (ex. 20OFFCOURSE)
                  </Form.Label>
                </Form.Group>
                <select className="form-select mb-3" defaultValue="0" aria-label="Default select example" id="nameSelect" ref={typeRef}>
                  <option value="free-course">Free Course</option>
                  <option value="dollar-off">Dollar Off</option>
                  <option value="percent-off">Percent Off</option>
                </select>
                <p>
                  For Dollar Off enter the value in dollars (ex. 20 = 20 dollars off) <br />
                  For Percent Off enter the value as a decimal (ex. 0.20 = 20% off)
                </p>
                <Form.Group id="valuecode" className="mb-3 mt-4 form-floating">
                  <Form.Control type="text" ref={valueRef} className="form-control" placeholder="Promo Code" id="InputValue" aria-describedby="promo code name" />
                  <Form.Label for="InputValue" className="form-label floatingInput">
                    Promo Value (only for Dollar Off and Percent Off codes)
                  </Form.Label>
                </Form.Group>
                <Button bsPrefix="button-sh" className="mt-4" type="submit">
                  Add New Promo Code
                </Button>
              </Form>
              <h3 className="text-shblue text-start">Current Codes:</h3>
              {promos?.map((promo) => {
                return (
                  <Card key={promo.codename} className="p-3 is-shblue mb-3 w-25 text-white">
                    <Card.Body>
                      {" "}
                      <p>Code: {promo.codename}</p>
                      <p>Type: {promo.type}</p>
                      <p>Value: {promo.value ? promo.value : "Free Course"}</p>
                      <Button onClick={() => handleRemove(promo.codename)} bsPrefix="button-sh">
                        Remove Promo
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
