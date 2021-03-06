import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext.js";

export default function Lesson() {
  let { id, child } = useParams();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(-1);
  const { currentUser } = useAuth();

  const courseref = firebase.firestore().collection("lessons").doc(id);
  const childref = firebase.firestore().collection("users").doc(currentUser.uid);

  function getCourse() {
    setLoading(true);
    childref.get().then((kid) => {
      if (kid.exists) {
        const kiddata = kid.data()["children"][child] ? kid.data()["children"][child]["courses"] : [];
        const kidcomplete = kid.data()["children"][child] ? kid.data()["children"][child]["complete"] : [];
        if (kiddata.find((element) => element === id) || kidcomplete.find((element) => element === id)) {
          courseref.get().then((doc) => {
            if (doc.exists) {
              setCourse(doc.data());
              console.log(course, course.sync);
            }
            setLoading(false);
          });
        } else {
          setCourse([]);
          setLoading(false);
        }
      }
    });
    // courseref.get().then((doc) => {
    //     if (doc.exists) {
    //         setCourse(doc.data())
    //     }
    //     setLoading(false)
    // })
  }

  function handleLessonChange(index) {
    setCurrentLesson(index);
    console.log(index);
  }

  useEffect(() => {
    getCourse();
  }, []);

  if (loading) {
    return <h1 className="text-shblue pt-3 text-center">Loading...</h1>;
  }

  // Course not Found Error Page
  if (course.length === 0) {
    return (
      <>
        <h1 className="text-shblue pt-3 text-center">Lesson not found</h1>
        <h4 className="text-center text-secondary mb-4">
          See my courses <Link to="/dashboard">here!</Link>
        </h4>
      </>
    );
  }

  return (
    <>
      <div id="lesson-section">
        <div className="text-center py-4" style={{ backgroundColor: "#E3E3E3" }}>
          <h1 className="text-shblue">Lesson Module</h1>
          <p>Welcome to {course.name}</p>
          {course.sync && (
            <>
              <h5 className="text-shblue mt-2">This course is synchronous!</h5>
              <p>
                {course.schedule} at <a href={course.zoom}>{course.zoom}</a>
              </p>
            </>
          )}
          {course.product && (
            <>
              <h5 className="text-shblue mt-2">This course recommends an extra resource!</h5>
              <p>
                {course.productdescription} <br /> Estimated ${course.productprice} at{" "}
                <a href={course.productlink} target="_blank" rel="noopener noreferrer">
                  {course.productlink}
                </a>{" "}
                (Actual price may vary)
              </p>
            </>
          )}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-12 is-shblue text-white pt-3 text-center rounded-end">
            {course.lessons.map((lessonNum, index) => {
              return (
                <>
                  {/* <h5 key={index} onClick={() => handleLessonChange(index)}>
                    {">"} {lessonNum}
                  </h5>
                  {index !== course.lessons.length - 1 && <hr />} */}
                  <Button bsPrefix="button-sh" key={index} onClick={() => handleLessonChange(index)}>
                    <strong>{lessonNum}</strong>
                  </Button>
                  <br />
                  {index !== course.lessons.length - 1 && <hr />}
                </>
              );
            })}
            <br />
          </div>
          <div className="col-md-9 col-sm-12 px-5 pt-4">
            <ContentBox lssn={currentLesson} courseInfo={course} child={child} courseid={id} userid={currentUser.uid} />
          </div>
        </div>
      </div>
    </>
  );
}

function ContentBox(props) {
  const childref = firebase.firestore().collection("users").doc(props.userid);
  const history = useHistory();

  let lessn = props.courseInfo.lessonContent[props.courseInfo.lessons[props.lssn]];
  let content = "";

  function handleComplete() {
    console.log("completing course");
    console.log(props.child, props.courseInfo, props.courseid);
    childref.update({
      [`children.${props.child}.complete`]: firebase.firestore.FieldValue.arrayUnion(props.courseid),
      [`children.${props.child}.courses`]: firebase.firestore.FieldValue.arrayRemove(props.courseid),
    });
    history.push(`/student-dashboard/${props.child}`);
  }

  if (props.lssn !== -1) {
    if (Object.keys(lessn)[0] === "article") {
      content = lessn["article"];
    } else if (Object.keys(lessn)[0] === "video") {
      content = <iframe className="w-100" height="400" src={`https://www.youtube.com/embed/${lessn["video"]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    } else if (Object.keys(lessn)[0] === "media") {
      content = <iframe src={`${lessn["media"]}preview`} className="w-100" height="315" allow="autoplay"></iframe>;
    } else if (Object.keys(lessn)[0] === "pdf") {
      //https://drive.google.com/file/d/1NHmZf-mZ4Si5vscKPcD_Tz9r02C1eZ_g/view
      content = <iframe src={`${lessn["pdf"]}preview`} className="w-100" height="480" allow="autoplay"></iframe>;
    } else if (Object.keys(lessn)[0] === "quiz") {
      content = (
        <iframe src={`${lessn["quiz"]}`} className="w-100" height="1316" frameborder="0" marginheight="0" marginwidth="0">
          Loading???
        </iframe>
      );
    } else {
      content = (
        <>
          <p>{lessn["complete"]}</p>
          {/* <Link to={`/student-dashboard/${props.child}`}> */}
          <Button bsPrefix="button-sh" onClick={handleComplete}>
            Complete!
          </Button>
          {/* </Link> */}
        </>
      );
    }
  }

  return (
    <>
      {props.lssn === -1 ? (
        <div className="mb-4">
          <h1 className="text-shblue">Welcome!</h1>
          <p className="mb-2">We're so excited to see you! Navigate through your course by clicking on the orange tabs on the left to begin!</p>
          <iframe src={`https://drive.google.com/file/d/1cMimNo_yLZ586mwCOSX2UxmTrPMY_FZh/preview`} width="600" height="315" allow="autoplay"></iframe>
        </div>
      ) : (
        <div className="mb-4">
          <h3 className="text-shblue">{props.courseInfo.lessons[props.lssn]}</h3>
          {content}
        </div>
      )}
    </>
  );
}
