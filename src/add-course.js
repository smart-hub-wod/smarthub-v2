import React, { useRef, useEffect } from "react";
import { Form, Button, Card, Alert, InputGroup, FormControl, Image } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "./contexts/AuthContext.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddCourse() {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timelineRef = useRef();
  const IDRef = useRef();
  const StartDateRef = useRef();
  const EndDateRef = useRef();
  const StartTimeRef = useRef();
  const productnameRef = useRef();
  const productpriceRef = useRef();
  const productlinkRef = useRef();
  const EndTimeRef = useRef();
  const outlineRef = useRef();
  const coverRef = useRef();
  const orderRef = useRef();
  const GradeRef = useRef();
  const priceRef = useRef();
  const zoomRef = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [sync, setSync] = useState("");
  const [publish, setPublish] = useState("");
  const [product, setProduct] = useState("");
  const [grades, setGrades] = useState([]);
  const [alert, setAlert] = useState();
  const [admin, setAdmin] = useState(false);

  const adminRef = firebase.firestore().collection("users").doc("admins");

  var dayjs = require("dayjs");

  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);

  const [ID, setID] = useState("");
  const { currentUser } = useAuth();

  var storageRef = firebase.storage().ref();
  const lessonref = firebase.firestore().collection("lessons");
  const courseref = firebase.firestore().collection("courses");
  const checkBoxes = ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "teacher", "parent"];

  function getAdmin() {
    adminRef.get().then((doc) => {
      setAdmin(doc.data().accounts.includes(currentUser.email));
    });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(JSON.parse(outlineRef.current.value));
    // console.log(EndDateRef.current.value); //2021-08-24
    // console.log(StartTimeRef.current.value); //02:00
    if (admin === true) {
      const lessonPlan = JSON.parse(outlineRef.current.value);
      lessonPlan["Finished!"] = { complete: "Congrats you did it! Click below to finish the course and access your certificate!" };
      const lessonOrder = orderRef.current.value.split(",");
      lessonOrder.push("Finished!");
      console.log(lessonPlan, lessonOrder);
      lessonref
        .doc(IDRef.current.value)
        .set({
          name: titleRef.current.value,
          lessons: lessonOrder,
          lessonContent: lessonPlan,
          sync: sync,
          schedule:
            sync === true
              ? `Every ${dayjs(StartDateRef.current.value).format("dddd")} from ${dayjs(StartDateRef.current.value).format("MMMM D, YYYY")} to ${dayjs(EndDateRef.current.value).format("MMMM D, YYYY")} at ${dayjs(StartTimeRef.current.value, "HH:mm").format("h:mm A")} to ${dayjs(
                  EndTimeRef.current.value,
                  "HH:mm"
                ).format("h:mm A")}`
              : "",
          zoom: zoomRef.current.value,
          productlink: productlinkRef.current.value,
          product: product,
          productdescription: productnameRef.current.value,
          productprice: productpriceRef.current.value,
        })
        .then(() => {
          console.log("Document successfully written!");
          courseref
            .doc(IDRef.current.value)
            .set({
              title: titleRef.current.value,
              id: IDRef.current.value,
              description: descriptionRef.current.value,
              price: priceRef.current.value,
              timeline: parseInt(timelineRef.current.value),
              modules: orderRef.current.value.split(",").length,
              published: publish,
              sync: sync,
              productlink: productlinkRef.current.value,
              product: product,
              grades: grades,
              defaultCover: coverRef.current.files.length > 0 ? false : true,
              instructor: currentUser.displayName,
              instructor_pic: currentUser.photoURL ? currentUser.photoURL : "../defaultpfp.png",
            })
            .then(() => {
              if (coverRef.current.files.length > 0) {
                const picRef = storageRef.child(`${IDRef.current.value}/${IDRef.current.value}.jpeg`);
                picRef.put(coverRef.current.files[0]).then((snapshot) => {
                  console.log("Uploaded a blob or file!");
                });
              }
              setAlert(`${titleRef.current.value} was successfully added. If you wish to submit another course, refresh this page!`);
            })
            .then(() => {
              adminRef.update({
                [`courses.${currentUser.email.split(".")[0]}`]: firebase.firestore.FieldValue.arrayUnion(IDRef.current.value),
              });
            });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }

  function titleMaker(title) {
    let finished = title.split("-");
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }
  const handleTitle = (e) => {
    setID(e.target.value.replace(/ /g, "-").toLowerCase() + "-" + btoa(dayjs().format()).substring(23, 29));
  };

  const handleCheck = (e) => {
    const gradesArr = [];
    checkBoxes.map((gradeid) => {
      if (document.getElementById(gradeid).checked === true) {
        gradesArr.push(gradeid);
      }
    });
    setGrades(gradesArr);
  };

  const handleSync = (e) => {
    setSync(e.target.id === "yessync");
    console.log(admin);
  };

  const handlePublish = (e) => {
    setPublish(e.target.id === "yespublish");
  };
  const handleProduct = (e) => {
    setProduct(e.target.id === "yesproduct");
    console.log(productnameRef.current.value, productpriceRef.current.value, productlinkRef.current.value, product);
  };

  return (
    <>
      <div>
        <Card className="card m-5 p-5">
          <Card.Body>
            <h1 className="text-center text-shblue">Add New Course</h1>
            <Form onSubmit={handleSubmit}>
              <p>
                <strong>Course Title</strong> will be the display name and cannot be changed after submitting. Example: Computer Engineering
              </p>
              <Form.Group id="title" className="mb-3 form-floating">
                <Form.Control type="text" ref={titleRef} onChange={handleTitle} className="form-control" placeholder="Course Title" id="InputName" aria-describedby="name" required />
                <Form.Label for="InputName" className="form-label floatingInput">
                  Course Title
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Course ID</strong>
              </p>
              <Form.Group id="courseid" className="mb-3 form-floating">
                <Form.Control type="text" value={ID} ref={IDRef} className="form-control" placeholder="Course ID" id="InputID" aria-describedby="id" required readOnly />
                <Form.Label for="InputID" className="form-label floatingInput">
                  Course ID
                </Form.Label>
              </Form.Group>
              <Form.Group id="description" className="mb-3 form-floating">
                <Form.Control
                  as="textarea"
                  style={{
                    height: "200px",
                  }}
                  type="text"
                  ref={descriptionRef}
                  className="form-control"
                  placeholder="Description"
                  id="InputDescription"
                  aria-describedby="description"
                  required
                />
                <Form.Label for="InputDescription" className="form-label floatingInput">
                  Course Description
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Expected Duration of Course (in hours)</strong> Example: 10 hours
              </p>
              <InputGroup id="timeline" className="mb-3 form-floating">
                <FormControl type="number" aria-describedby="basic-addon2" ref={timelineRef} className="form-control" placeholder="Timeline" id="InputTimeline" aria-describedby="timeline" required />
                <InputGroup.Text id="basic-addon2">hours</InputGroup.Text>
                {/* <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label> */}
              </InputGroup>
              <p>
                <strong>Price</strong>
              </p>
              <InputGroup id="price" className="mb-3 form-floating">
                <InputGroup.Text id="basic-addon3">$</InputGroup.Text>
                <FormControl type="number" aria-describedby="basic-addon3" ref={priceRef} className="form-control" placeholder="Price" id="InputPrice" aria-describedby="price" required defaultValue={50} />

                {/* <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label> */}
              </InputGroup>
              <p>
                <strong>Will this course be synchronous?</strong>
              </p>
              <Form.Group id="sync" className="mb-3 form-floating" onChange={handleSync}>
                <div className="mb-3">
                  <Form.Check inline label="Yes it will have live sessions" name="group3" type="radio" id="yessync" />
                  <Form.Check inline label="No it is entirely asynchronous" name="group3" type="radio" id="nosync" />
                </div>
              </Form.Group>
              <p>
                <strong>Live Sessions</strong> Only if you selected Yes in the question above
              </p>
              <Form.Group id="startdate" className="mb-3 form-floating">
                <Form.Control type="date" ref={StartDateRef} className="form-control" placeholder="Start Date" id="InputStartDate" aria-describedby="start date" required={sync} />
                <Form.Label for="InputStartDate" className="form-label floatingInput">
                  Start Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="enddate" className="mb-3 form-floating">
                <Form.Control type="date" ref={EndDateRef} className="form-control" placeholder="End Date" id="InputEndDate" aria-describedby="end date" required={sync} />
                <Form.Label for="InputEndDate" className="form-label floatingInput">
                  End Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="starttime" className="mb-3 form-floating">
                <Form.Control type="time" ref={StartTimeRef} className="form-control" placeholder="Start Time" id="InputStartTime" aria-describedby="start time" required={sync} />
                <Form.Label for="InputStartTime" className="form-label floatingInput">
                  Start Time
                </Form.Label>
              </Form.Group>
              <Form.Group id="endtime" className="mb-3 form-floating">
                <Form.Control type="time" ref={EndTimeRef} className="form-control" placeholder="End Time" id="InputEndTime" aria-describedby="end time" required={sync} />
                <Form.Label for="InputEndTime" className="form-label floatingInput">
                  End Time
                </Form.Label>
              </Form.Group>
              <Form.Group id="zoomlink" className="mb-3 form-floating">
                <Form.Control type="text" ref={zoomRef} className="form-control" placeholder="Zoom Link" id="InputZoom" aria-describedby="zoom link" required={sync} />
                <Form.Label for="InputZoom" className="form-label floatingInput">
                  Zoom Link
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Grade Level</strong>
              </p>
              <Form.Group id="gradelevel" className="mb-3 form-floating" onChange={handleCheck} ref={GradeRef}>
                <div className="mb-3">
                  {checkBoxes.map((grade) => {
                    return <Form.Check key={grade} inline label={titleMaker(grade)} name="group1" type="checkbox" id={grade} />;
                  })}
                  {/* <Form.Check inline label="Kindergarten" name="group1" type="checkbox" id="kindergarten" />
                  <Form.Check inline label="Grade 1" name="group1" type="checkbox" id="grade-1" />
                  <Form.Check inline label="Grade 2" name="group1" type="checkbox" id="grade-2" />
                  <Form.Check inline label="Grade 3" name="group1" type="checkbox" id="grade-3" />
                  <Form.Check inline label="Grade 4" name="group1" type="checkbox" id="grade-4" />
                  <Form.Check inline label="Grade 5" name="group1" type="checkbox" id="grade-5" /> */}
                </div>
              </Form.Group>
              <p>
                <strong>Does this course require a separate product?</strong>
              </p>
              <Form.Group id="product" className="mb-3 form-floating" onChange={handleProduct}>
                <div className="mb-3">
                  <Form.Check inline label="Yes it does require a separate product" name="group3" type="radio" id="yesproduct" />
                  <Form.Check inline label="No there is nothing additional to add" name="group3" type="radio" id="noproduct" />
                </div>
              </Form.Group>
              <p>
                <strong>Product Information:</strong> Only required if you selected 'Yes' above <br />
                Separate name and description using ' - '. Example: Music Machine - A machine that plays music!
              </p>
              <Form.Group id="productname" className="mb-3 form-floating">
                <Form.Control type="text" ref={productnameRef} className="form-control" placeholder="Product Name and Description" id="InputProdName" aria-describedby="product name and description" required={product} />
                <Form.Label for="InputProdName" className="form-label floatingInput">
                  Product Name and Description
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Current Price</strong> - Will be written as an estimate, provide the current listing price
              </p>
              <Form.Group id="productprice" className="mb-3 form-floating">
                <Form.Control type="text" ref={productpriceRef} className="form-control" placeholder="Product Price" id="InputProdPrice" aria-describedby="product price" required={product} />
                <Form.Label for="InputProdPrice" className="form-label floatingInput">
                  Current Price
                </Form.Label>
              </Form.Group>
              <Form.Group id="productlink" className="mb-3 form-floating">
                <Form.Control type="text" ref={productlinkRef} className="form-control" placeholder="Product Link" id="InputProdLink" aria-describedby="product link" required={product} />
                <Form.Label for="InputProdLink" className="form-label floatingInput">
                  Purchasing Link
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Content Outline</strong> Refer to{" "}
                <a href="https://www.notion.so/Adding-a-Course-e3cda0b54b4d49b8bd1dbd56f3a6d18a" target="_blank" rel="noopener noreferrer">
                  {" "}
                  this document
                </a>{" "}
                for details on how to construct a course outline
              </p>
              <Form.Group id="outline" className="mb-3 form-floating">
                <Form.Control
                  as="textarea"
                  style={{
                    height: "200px",
                  }}
                  type="text"
                  ref={outlineRef}
                  className="form-control"
                  placeholder="Outline"
                  id="InputOutline"
                  aria-describedby="content"
                  required
                />
              </Form.Group>
              <p>
                <strong>Course Order</strong> Refer to{" "}
                <a href="https://www.notion.so/Adding-a-Course-e3cda0b54b4d49b8bd1dbd56f3a6d18a" target="_blank" rel="noopener noreferrer">
                  this document
                </a>{" "}
                for details on how to construct a course order
              </p>
              <Form.Group id="order" className="mb-3 form-floating">
                <Form.Control
                  as="textarea"
                  style={{
                    height: "100px",
                  }}
                  type="text"
                  ref={orderRef}
                  className="form-control"
                  placeholder="Order"
                  id="InputOrder"
                  aria-describedby="order"
                  required
                />
                <Form.Label for="InputOrder" className="form-label floatingInput">
                  Course Order
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Cover Photo</strong> If not added will be replaced with default image
              </p>
              <Form.Group controlId="formFile" className="mb-3" id="coverPicInput">
                <Form.Control ref={coverRef} type="file" />
              </Form.Group>
              <p>
                <strong>Ready for Sale</strong>
              </p>
              <Form.Group id="productionReady" className="mb-3 form-floating" onChange={handlePublish}>
                <div className="mb-3">
                  <Form.Check inline label="Yes, publish immediately" name="group2" type="radio" id="yespublish" />
                  <Form.Check inline label="No, save as draft" name="group2" type="radio" id="nopublish" />
                </div>
              </Form.Group>
              <p>
                <strong>Course Author: </strong> {currentUser.displayName}
              </p>
              <Image className="mb-3" src={currentUser.photoURL ? currentUser.photoURL : "../defaultpfp.png"} roundedCircle style={{ height: "150px", width: "150px" }} />
              <p>
                Your display name and picture (shown above) associated with this account will be displayed alongside each course. To edit this information visit <Link to="/settings">Settings</Link>
              </p>
              <Button bsPrefix="button-sh" className="w-100" type="submit">
                Add Course
              </Button>
            </Form>
            {alert ? (
              <Alert className="mt-4" variant="success">
                {alert}
              </Alert>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
