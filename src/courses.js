import React, { useEffect, useState, useRef, forwardRef, createRef } from "react";
import firebase from "./firebase";
import "firebase/storage";
import { Card, Button, Spinner, Form, Alert, Tooltip, OverlayTrigger, Pagination } from "react-bootstrap";
import { Search, QuestionCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [alert, setAlert] = useState();
  const [newCourses, setNewCourses] = useState([]);
  var temp = [];
  const [searchValue, setSearchValue] = useState("");
  const [start, setStart] = useState(0);
  const searchRef = useRef();
  var storageRef = firebase.storage();
  // var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
  // coverRef.getDownloadURL()
  // .then((URL) => {
  //     setUrl(URL)

  // })

  let courseref = firebase.firestore().collection("courses").orderBy("title").startAfter(start).limit(2);
  const filters = ["All Grades", "kindergarten", "grade-1", "grade-2", "grade-3", "grade-4", "grade-5", "grade-6", "grade-7", "grade-8", "teacher", "parent"];

  function getCourses(refvar) {
    console.log(start);
    setLoading(true);
    const items = [];
    refvar.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().published) {
          const course = doc.data();
          console.log(doc.data().title);
          if (!doc.data().defaultCover) {
            var coverRef = storageRef.ref(`${course.id}/${course.id}.jpeg`);
            coverRef
              .getDownloadURL()
              .then((URL) => {
                course.url = URL;
              })
              .then(() => {
                //console.log(course.url)
              });
          } else {
            course.url = "../defaultcourseimage.png";
          }
          items.push(course);
        }
      });
      setCourses(items);
      courseref.get().then((documentSnapshots) => {
        setStart(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      });

      //searchRef.value = 'a'

      // setLoading(false)
      // setTimeout(setLoading(true), 100)
      // setTimeout(() => {
      //   // setSearchValue('')
      //   searchCourses();
      //   // resetSearch()
      setLoading(false);
      // }, 200);
      // setSearchValue('a')
      // searchCourses()
      // resetSearch()
      // setLoading(false)
    });
  }

  useEffect(() => {
    getCourses(courseref);
    console.log("hello");
  }, []);

  function searchCourses() {
    temp = [];

    courses.map((c) => {
      let s = c.title.toLowerCase().includes(searchValue.toLowerCase());
      if (s) {
        temp.push(c);
      }
    });
    setNewCourses([...temp]);
    if (temp.length > 0) {
      setFiltered(true);
      setAlert(null);
    } else {
      setFiltered(false);
      setAlert("No Courses Found!");
    }
  }

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  function handleNext() {
    courseref.get().then((documentSnapshots) => {
      // Get the last visible document
      var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible);
      setStart(lastVisible);

      // Construct a new query starting at this document,
      // get the next 25 cities.
      var next = firebase.firestore().collection("courses").orderBy("title").startAfter(start).limit(2);
      courseref = next;
      console.log(courseref === next);
      getCourses(next);
    });
  }
  function handlePrev() {
    courseref.get().then((documentSnapshots) => {
      var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log("last", lastVisible);
      setStart(lastVisible);
      var next = firebase.firestore().collection("courses").orderBy("title").endBefore(start).limit(2);
      courseref = next;
      console.log(courseref === next);
      getCourses(next);
    });
  }

  const handleGrade = (e) => {
    console.log(e.target.value);
    temp = [];

    courses.map((c) => {
      let s = "";
      if (e.target.value === "") {
        s = "";
      } else {
        s = c.grades.includes(e.target.value);
      }
      if (s) {
        temp.push(c);
      }
    });
    console.log(temp.length);
    setNewCourses([...temp]);
    if (temp.length > 0) {
      setFiltered(true);
      setAlert(null);
    } else {
      setFiltered(false);
      console.log(e.target.value);
      if (e.target.value !== "All Grades") {
        setAlert("No courses under this category exists! Try another!");
      }
    }
  };
  const handleSync = (e) => {
    console.log(e.target.value);
    temp = [];

    courses.map((c) => {
      let s = "";
      if (e.target.value === "") {
        s = "";
      } else {
        s = c.sync === (e.target.value === "sync");
      }
      if (s) {
        temp.push(c);
      }
    });
    console.log(temp.length);
    setNewCourses([...temp]);
    if (temp.length > 0) {
      setFiltered(true);
      setAlert(null);
    } else {
      setFiltered(false);
      if (e.target.value !== "Dev") {
        setAlert("No courses under this category exists! Try another!");
      }
    }
  };

  function resetSearch() {
    setFiltered(false);
    setSearchValue("");
  }

  function titleMaker(title) {
    let finished = title.split("-");
    finished.map((word, index) => {
      finished[index] = word.charAt(0).toUpperCase() + word.slice(1, word.length);
    });
    return finished.join(" ");
  }

  // const renderTooltip = (props) => (
  //   <Tooltip id="button-tooltip" {...props}>
  //     Asynchrno
  //   </Tooltip>
  // );

  // const FancyButton = React.forwardRef((props, ref) => (
  //   <button ref={ref} className="FancyButton">
  //     {props.children}
  //   </button>
  // ));
  // const ref = React.createRef();

  if (loading) {
    return <h1 className="text-shblue pt-3">Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-shblue pt-3 text-center">Courses</h1>
      <div className="text-start mx-5 d-flex justify-content-center">
        <input type="text" value={searchValue} onChange={handleSearchInput} className="form-control" placeholder="Search for Courses..." id="search-bar" aria-label="Search for Courses" aria-describedby="Search bar for course selection" />
        <Button bsPrefix="button-sh" onClick={searchCourses}>
          <Search color="white" />
        </Button>
      </div>
      <div className="text-start mx-5 pt-3 d-flex justify-content-center">
        <Button bsPrefix="button-sh" className="text-center mb-3" onClick={resetSearch}>
          Reset Search
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          <h5 className="mt-2 text-shblue text-center">Filter by grade:</h5>
          <div className="d-flex justify-content-center">
            <select className="mb-3 mt-2 d-flex form-select justify-content-center w-25" onChange={handleGrade} defaultValue="0">
              {filters.map((grade) => {
                return (
                  <>
                    <option bsPrefix="button-shmenu" key={grade} value={grade} id={grade}>
                      {titleMaker(grade)}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className="w-75">
          <OverlayTrigger
            data-placement="right"
            delay={{ hide: 450, show: 50 }}
            overlay={(props) => (
              <Tooltip {...props}>
                <strong>Asynchronous</strong> means the course can be completed at any time! <strong>Synchronous</strong> means there will be live lessons included with the course!
              </Tooltip>
            )}
            placement="bottom"
          >
            <h5 className="mt-2 text-shblue text-center">
              Filter by Delivery Method: <QuestionCircleFill></QuestionCircleFill>
            </h5>
          </OverlayTrigger>
          <div className="d-flex justify-content-center">
            <select className="mb-3 mt-2 d-flex form-select justify-content-center w-25" onChange={handleSync} defaultValue="0">
              <option bsPrefix="button-shmenu" value="Dev">
                All Delivery Methods
              </option>
              <option bsPrefix="button-shmenu" value="sync">
                Synchronous
              </option>
              <option bsPrefix="button-shmenu" value="async">
                Asynchronous
              </option>
            </select>
          </div>
        </div>
      </div>
      {alert && (
        <Alert variant="warning" className="px-5 text-center">
          {alert}
        </Alert>
      )}

      <div id="course-previews">
        {
          (filtered ? newCourses : courses).map((course) => (
            <Card className="p-3 mx-5 mb-3">
              <div className="row">
                <div className="col-md-6 col-lg-3 overflow-hidden">
                  {course.url ? (
                    <img height="200" src={course.url} className="rep-photo" />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner animation="border" className="" variant="primary" />
                    </div>
                  )}
                </div>
                <div key={course.id} className="col-md-6 col-lg-9 mt-3 mt-md-0">
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <Link to={`/course-listing/${course.id}`}>
                    <Button bsPrefix="button-sh">View Course</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
          // : courses.map((course) => (
          //     <Card className="p-3 mx-5 mb-3">
          //         <div className="row">
          //         <div className="col-3 overflow-hidden">
          //             <img height="250" src={course.url} />
          //         </div>
          //         <div key={course.id} className="col-9">
          //             <h2>{course.title}</h2>
          //             <p>{course.description}</p>
          //             <Link to={`/course-listing/${course.id}`}><Button bsPrefix="button-sh">View Course</Button></Link>
          //         </div>
          //         </div>
          //     </Card>

          // ))}
        }
      </div>
      <Pagination className="d-flex justify-content-center">
        <Pagination.Prev onClick={handlePrev}> </Pagination.Prev>
        <Pagination.Next onClick={handleNext}> </Pagination.Next>
      </Pagination>
    </div>
  );
}
