import React, { useRef, useEffect } from "react";
import { Form, Button, Card, Alert, InputGroup, FormControl, Image } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/storage";
import { useAuth } from "./contexts/AuthContext.js";
import { useState } from "react";
import { Link } from "react-router-dom";
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
  const zoomRef = useRef();
  const [errMessage, setErrMessage] = useState("");
  const [sync, setSync] = useState("");
  const [publish, setPublish] = useState("");
  const [grades, setGrades] = useState([]);
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState({});
  const [alert, setAlert] = useState();
  const [admin, setAdmin] = useState(false);

  const adminRef = firebase.firestore().collection("users").doc("admins");

  var dayjs = require("dayjs");

  var customParseFormat = require("dayjs/plugin/customParseFormat");
  dayjs.extend(customParseFormat);

  const [ID, setID] = useState("");
  const { currentUser } = useAuth();

  function deleteModal() {
    console.log("deleting");
  }

  var storageRef = firebase.storage().ref();
  const lessonref = firebase.firestore().collection("lessons");
  const courseref = firebase.firestore().collection("courses");
  const checkBoxes = ["kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5"];

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
          });
      })
      .then(() => {
        lessonref
          .doc(id)
          .get()
          .then((doc) => {
            setLesson(doc.data());
            console.log(doc.data());
          });
      });
  }

  useEffect(() => {
    getAdmin();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.parse(outlineRef.current.value));
    console.log(EndDateRef.current.value); //2021-08-24
    console.log(StartTimeRef.current.value); //02:00

    if (admin === true) {
      const lessonPlan = JSON.parse(outlineRef.current.value);
      lessonPlan["Finished!"] = { complete: "Congrats you did it! Click below to finish the course and access your certificate!" };
      const lessonOrder = orderRef.current.value.split(",");
      lessonOrder.push("Finished!");
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
        })
        .then(() => {
          console.log("Document successfully written!");
          courseref
            .doc(IDRef.current.value)
            .update({
              title: titleRef.current.value,
              id: IDRef.current.value,
              description: descriptionRef.current.value,
              price: 50,
              timeline: parseInt(timelineRef.current.value),
              modules: orderRef.current.value.split(",").length,
              published: publish,
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
    console.log(admin);
  };

  const handlePublish = (e) => {
    setPublish(e.target.id === "yespublish");
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
                <Form.Control type="text" ref={titleRef} onChange={handleTitle} className="form-control" placeholder="Course Title" id="InputName" aria-describedby="name" required defaultValue={course.title} readOnly />
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
                  defaultValue={course.description}
                />
                <Form.Label for="InputDescription" className="form-label floatingInput">
                  Course Description
                </Form.Label>
              </Form.Group>
              <p>
                <strong>Expected Duration of Course (in hours)</strong> Example: 10 hours
              </p>
              <InputGroup id="timeline" className="mb-3 form-floating">
                <FormControl type="number" aria-describedby="basic-addon2" ref={timelineRef} className="form-control" placeholder="Timeline" id="InputTimeline" aria-describedby="timeline" required defaultValue={course.timeline} />
                <InputGroup.Text id="basic-addon2">hours</InputGroup.Text>
                {/* <Form.Label for="InputTimeline" className="form-label floatingInput">Timeline</Form.Label> */}
              </InputGroup>
              <p>
                <strong>Will this course be synchronous?</strong>
              </p>
              <Form.Group id="sync" className="mb-3 form-floating" onChange={handleSync}>
                <div className="mb-3">
                  {course.sync ? <Form.Check inline label="Yes it will have live sessions" name="group3" type="radio" id="yessync" checked /> : <Form.Check inline label="Yes it will have live sessions" name="group3" type="radio" id="yessync" />}
                  {!course.sync ? <Form.Check inline label="No it is entirely asynchronous" name="group3" type="radio" id="nosync" checked /> : <Form.Check inline label="No it is entirely asynchronous" name="group3" type="radio" id="nosync" />}
                </div>
              </Form.Group>
              <p>
                <strong>Live Sessions</strong> Only if you selected Yes in the question above
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
                <Form.Control type="text" ref={zoomRef} className="form-control" placeholder="Zoom Link" id="InputZoom" aria-describedby="id" defaultValue={lesson.zoom} />
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
                    if (course.grades?.includes(grade)) {
                      return <Form.Check key={grade} inline label={titleMaker(grade)} name="group1" type="checkbox" id={grade} checked />;
                    } else {
                      return <Form.Check key={grade} inline label={titleMaker(grade)} name="group1" type="checkbox" id={grade} />;
                    }
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
                  defaultValue={JSON.stringify(lesson.lessonContent)}
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
                <strong>Cover Photo</strong> The previous image is saved, ONLY update if you need to change this photo.
              </p>
              <Form.Group controlId="formFile" className="mb-3" id="coverPicInput">
                <Form.Control ref={coverRef} type="file" />
              </Form.Group>
              <p>
                <strong>Ready for Sale</strong>
              </p>
              <Form.Group id="productionReady" className="mb-3 form-floating" onChange={handlePublish}>
                <div className="mb-3">
                  {course.published ? <Form.Check inline label="Yes, publish immediately" name="group2" type="radio" id="yespublish" checked /> : <Form.Check inline label="Yes, publish immediately" name="group2" type="radio" id="yespublish" />}
                  {!course.published ? <Form.Check inline label="No, save as draft" name="group2" type="radio" id="nopublish" checked /> : <Form.Check inline label="No, save as draft" name="group2" type="radio" id="nopublish" />}
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
            <Button variant="danger" className="w-100 mt-3" onClick={deleteModal}>
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
    </>
  );
}
