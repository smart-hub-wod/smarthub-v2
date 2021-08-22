import React, { useRef, useEffect } from "react";
import { Form, Button, Card, Alert, InputGroup, FormControl, Image, Modal } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "./contexts/AuthContext.js";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";

export default function EditCourse() {
  let { id } = useParams();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const timelineRef = useRef();
  const IDRef = useRef();
  const StartDateRef = useRef();
  const EndDateRef = useRef();
  const StartTimeRef = useRef();
  const EndTimeRef = useRef();
  const outlineRef = useRef();
  const coverRef = useRef();
  const orderRef = useRef();
  const GradeRef = useRef();
  const priceRef = useRef();
  const zoomRef = useRef();
  const productnameRef = useRef();
  const productpriceRef = useRef();
  const productlinkRef = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [sync, setSync] = useState();
  const [publish, setPublish] = useState();
  const [product, setProduct] = useState("");

  const [grades, setGrades] = useState([]);
  const [dateField, setDateField] = useState();
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const [alert, setAlert] = useState();
  const [admin, setAdmin] = useState(false);
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const adminRef = firebase.firestore().collection("users").doc("admins");

  var dayjs = require("dayjs");

  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);

  const [ID, setID] = useState("");
  const { currentUser } = useAuth();

  function deleteCourse() {
    console.log("deleting");
    console.log(id);
    firebase
      .firestore()
      .collection("lessons")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .then(() => {
        firebase
          .firestore()
          .collection("courses")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          });
      })
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .doc("admins")
          .update({
            [`courses.${currentUser.email.split(".")[0]}`]: firebase.firestore.FieldValue.arrayRemove(id),
          })
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .then(() => {
            firebase
              .storage()
              .ref()
              .child(`${id}/${id}.jpeg`)
              .delete()
              .then(() => {
                console.log("file deleted!");
              });
          });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    history.push("/dashboard");
  }

  var storageRef = firebase.storage().ref();
  const lessonref = firebase.firestore().collection("lessons");
  const courseref = firebase.firestore().collection("courses");
  const checkBoxes = ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "teacher", "parent"];

  function getAdmin() {
    adminRef
      .get()
      .then((doc) => {
        const eml = currentUser.email.split(".")[0];
        //console.log(doc.data().courses[eml]);
        setAdmin(doc.data().accounts.includes(currentUser.email) && (doc.data().courses[eml].includes(id) || currentUser.email === "dev@smarthub.ca"));
      })
      .then(() => {
        courseref
          .doc(id)
          .get()
          .then((doc) => {
            setCourse(doc.data());
            console.log(doc.data());
            setPublish(doc.data().published);
            setSync(doc.data().sync);
            setGrades(doc.data().grades);
          });
      })
      .then(() => {
        lessonref
          .doc(id)
          .get()
          .then((doc) => {
            setLesson(doc.data());
            //setDateField(doc.data().schedule.split(" "));
          });
      });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(publish, "PUBLISHED");
    console.log(sync, "SYNC");

    if (admin === true) {
      const lessonPlan = JSON.parse(outlineRef.current.value);
      lessonPlan["Finished!"] = { complete: "Congrats you did it! Click below to finish the course and access your certificate!" };
      const lessonOrder = orderRef.current.value.split(",");
      console.log(lessonPlan, lessonOrder);
      lessonref
        .doc(IDRef.current.value)
        .update({
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
            .update({
              title: titleRef.current.value,
              id: IDRef.current.value,
              description: descriptionRef.current.value,
              price: priceRef.current.value,
              timeline: parseInt(timelineRef.current.value),
              modules: orderRef.current.value.split(",").length,
              published: publish,
              productlink: productlinkRef.current.value,
              product: product,
              sync: sync,
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
              setAlert(`${titleRef.current.value} was successfully updated. If you wish to update this course again, refresh this page!`);
            });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
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

  function titleMaker(title) {
    let finished = title.split("-");
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  const handleSync = (e) => {
    setSync(e.target.id === "yessync");
    console.log(e.target.id);
    console.log(course.sync);
  };

  const handlePublish = (e) => {
    setPublish(e.target.id === "yespublish");
    console.log(e.target.id);
    console.log(course.published);
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
            <h1 className="text-center text-shblue">Edit Course</h1>
            <Form onSubmit={handleSubmit}>
              <p>
                <strong>Course Title</strong> will be the display name. Example: Computer Engineering
              </p>
              <Form.Group id="title" className="mb-3 form-floating">
                <Form.Control type="text" ref={titleRef} onChange={handleTitle} className="form-control" placeholder="Course Title" id="InputName" aria-describedby="name" required defaultValue={course?.title} readOnly />
                <Form.Label for="InputName" className="form-label floatingInput">
                  Course Title
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Course ID</strong> should be course name hyphenated and lowercase. Example: computer-engineering
              </p>
              <Form.Group id="courseid" className="mb-3 form-floating">
                <Form.Control type="text" ref={IDRef} className="form-control" placeholder="Course ID" id="InputID" aria-describedby="id" required readOnly defaultValue={id} />
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
                  defaultValue={course?.description}
                  //defaultValue={dayjs(dateField?.slice(3, 6).join(" "), "MMMM D, YYYY").format("YYYY-MM-DD")}
                  //{dayjs(dateField.slice(3, 6).join(" "), "MMMM D, YYYY").format("YYYY-MM-DD")}
                />
                <Form.Label for="InputDescription" className="form-label floatingInput">
                  Course Description
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Expected Duration of Course (in hours)</strong> Example: 10 hours
              </p>
              <InputGroup id="timeline" className="mb-3 form-floating">
                <FormControl type="number" aria-describedby="basic-addon2" ref={timelineRef} className="form-control" placeholder="Timeline" id="InputTimeline" aria-describedby="timeline" required defaultValue={course?.timeline} />
                <InputGroup.Text id="basic-addon2">hours</InputGroup.Text>
                {/* <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label> */}
              </InputGroup>
              <p>
                <strong>Price</strong>
              </p>
              <InputGroup id="price" className="mb-3 form-floating">
                <InputGroup.Text id="basic-addon3">$</InputGroup.Text>
                <FormControl type="number" aria-describedby="basic-addon3" ref={priceRef} className="form-control" placeholder="Price" id="InputPrice" aria-describedby="price" required defaultValue={course?.price} />

                {/* <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label> */}
              </InputGroup>
              <p>
                <strong>Will this course be synchronous?</strong>
              </p>
              <Form.Group id="sync" className="mb-3 form-floating" onChange={handleSync}>
                <div className="mb-3">
                  <Form.Check inline label="Yes it will have live sessions" name="group8" type="radio" id="yessync" defaultChecked={course?.sync} />
                  <Form.Check inline label="No it is entirely asynchronous" name="group8" type="radio" id="nosync" defaultChecked={!course?.sync} />
                </div>
              </Form.Group>
              <p>
                <strong>Live Sessions</strong> Only if you selected Yes in the question above!
                {lesson.sync && (
                  <p>
                    <br />
                    You must add the schedule again before saving!
                    <br />
                    Your Previous Schedule was: <br />
                    {lesson.schedule}
                  </p>
                )}
              </p>
              <Form.Group id="startdate" className="mb-3 form-floating">
                <Form.Control type="date" ref={StartDateRef} className="form-control" placeholder="Start Date" id="InputStartDate" aria-describedby="id" />
                <Form.Label for="InputStartDate" className="form-label floatingInput">
                  Start Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="enddate" className="mb-3 form-floating">
                <Form.Control type="date" ref={EndDateRef} className="form-control" placeholder="End Date" id="InputEndDate" aria-describedby="id" />
                <Form.Label for="InputEndDate" className="form-label floatingInput">
                  End Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="starttime" className="mb-3 form-floating">
                <Form.Control type="time" ref={StartTimeRef} className="form-control" placeholder="Start Time" id="InputStartTime" aria-describedby="id" />
                <Form.Label for="InputStartTime" className="form-label floatingInput">
                  Start Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="endtime" className="mb-3 form-floating">
                <Form.Control type="time" ref={EndTimeRef} className="form-control" placeholder="End Time" id="InputEndTime" aria-describedby="id" />
                <Form.Label for="InputEndTime" className="form-label floatingInput">
                  End Date
                </Form.Label>
              </Form.Group>
              <Form.Group id="zoomlink" className="mb-3 form-floating">
                <Form.Control type="text" ref={zoomRef} className="form-control" placeholder="Zoom Link" id="InputZoom" aria-describedby="id" defaultValue={lesson?.zoom} />
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
                    return <Form.Check key={grade} inline label={titleMaker(grade)} name="group1" type="checkbox" id={grade} defaultChecked={course?.grades?.includes(grade)} />;
                  })}
                </div>
              </Form.Group>
              <p>
                <strong>Does this course require a separate product?</strong>
              </p>
              <Form.Group id="product" className="mb-3 form-floating" onChange={handleProduct}>
                <div className="mb-3">
                  <Form.Check inline label="Yes it does require a separate product" name="group3" type="radio" id="yesproduct" defaultChecked={lesson?.product} />
                  <Form.Check inline label="No there is nothing additional to add" name="group3" type="radio" id="noproduct" defaultChecked={!lesson?.product} />
                </div>
              </Form.Group>
              <p>
                <strong>Product Information:</strong> Only required if you selected 'Yes' above <br />
                Separate name and description using ' - '. Example: Music Machine - A machine that plays music!
              </p>
              <Form.Group id="productname" className="mb-3 form-floating">
                <Form.Control type="text" ref={productnameRef} className="form-control" placeholder="Product Name and Description" id="InputProdName" aria-describedby="product name and description" required={product} defaultValue={lesson?.productdescription} />
                <Form.Label for="InputProdName" className="form-label floatingInput">
                  Product Name and Description
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Current Price</strong> - Will be written as an estimate, provide the current listing price
              </p>
              <Form.Group id="productprice" className="mb-3 form-floating">
                <Form.Control type="text" ref={productpriceRef} className="form-control" placeholder="Product Price" id="InputProdPrice" aria-describedby="product price" required={product} defaultValue={lesson?.productprice} />
                <Form.Label for="InputProdPrice" className="form-label floatingInput">
                  Current Price
                </Form.Label>
              </Form.Group>
              <Form.Group id="productlink" className="mb-3 form-floating">
                <Form.Control type="text" ref={productlinkRef} className="form-control" placeholder="Product Link" id="InputProdLink" aria-describedby="product link" required={product} defaultValue={lesson?.productlink} />
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
                  defaultValue={JSON.stringify(lesson?.lessonContent, undefined, 4)}
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
                  defaultValue={lesson?.lessons?.toString()}
                />
                <Form.Label for="InputOrder" className="form-label floatingInput">
                  Course Order
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Cover Photo</strong> Reupload photo even if previously uploaded
              </p>
              <Form.Group controlId="formFile" className="mb-3" id="coverPicInput">
                <Form.Control ref={coverRef} type="file" />
              </Form.Group>
              <p>
                <strong>Ready for Sale</strong>
              </p>
              <Form.Group id="productionReady" className="mb-3 form-floating" onChange={handlePublish}>
                <div className="mb-3">
                  <Form.Check inline label="Yes, publish immediately" name="group2" type="radio" id="yespublish" defaultChecked={course?.published} />
                  <Form.Check inline label="No, save as draft" name="group2" type="radio" id="nopublish" defaultChecked={!course?.published} />
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
                Update Course
              </Button>
            </Form>
            <Button variant="danger" className="w-100 mt-3" onClick={handleShow}>
              Delete Course
            </Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Are you sure you want to delete this course?</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is a permanent decision and the course can not be recovered!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCourse}>
            Yes delete this course!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
