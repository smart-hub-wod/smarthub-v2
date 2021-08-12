import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
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
        if (kiddata.find((element) => element === id)) {
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
      <div className="text-center py-4" style={{ backgroundColor: "#E3E3E3" }}>
        <h1 className="text-shblue">Lesson Module</h1>
        <p>Welcome to {course.name}</p>
        {course.sync ? (
          <>
            <h5 className="text-shblue">This course is synchronous!</h5>
            <p>
              {course.schedule} at {course.zoom}
            </p>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="row justify-content-center">
        <div className="col-3 is-shblue text-white pt-3 text-center rounded-end">
          {course.lessons.map((lessonNum, index) => {
            return (
              <>
                <h5 key={index} onClick={() => handleLessonChange(index)}>
                  {lessonNum}
                </h5>
              </>
            );
          })}
          <br />
        </div>
        <div className="col-9 px-5 pt-4">
          <ContentBox lssn={currentLesson} courseInfo={course} child={child} />
        </div>
      </div>
    </>
  );
}

function ContentBox(props) {
  let lessn = props.courseInfo.lessonContent[props.courseInfo.lessons[props.lssn]];
  let content = "";

  function handleComplete() {
    console.log("hi");
  }

  if (props.lssn !== -1) {
    if (Object.keys(lessn)[0] === "article") {
      content = lessn["article"];
    } else if (Object.keys(lessn)[0] === "video") {
      content = <iframe width="560" height="315" src={`https://www.youtube.com/embed/${lessn["video"]}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    } else if (Object.keys(lessn)[0] === "pdf") {
      //https://drive.google.com/file/d/1NHmZf-mZ4Si5vscKPcD_Tz9r02C1eZ_g/view
      content = <iframe src={`${lessn["pdf"]}preview`} width="640" height="480" allow="autoplay"></iframe>;
    } else if (Object.keys(lessn)[0] === "quiz") {
      content = (
        <iframe src={`${lessn["quiz"]}`} width="640" height="1316" frameborder="0" marginheight="0" marginwidth="0">
          Loading…
        </iframe>
      );
    } else {
      content = (
        <>
          <p>{lessn["complete"]}</p>
          <Link to={`/student-dashboard/${props.child}`}>
            <Button bsPrefix="button-sh" onClick={handleComplete}>
              Complete!
            </Button>
          </Link>
        </>
      );
    }
  }

  return (
    <>
      {props.lssn === -1 ? (
        <p>Welcome! Click a lesson number on the left to begin!</p>
      ) : (
        <>
          <h3 className="text-shblue">{props.courseInfo.lessons[props.lssn]}</h3>
          {content}
        </>
      )}
    </>
  );
}
