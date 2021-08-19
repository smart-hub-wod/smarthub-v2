import React, { useEffect, useState, useRef } from "react";
import firebase from "./firebase";
import "firebase/storage";
import { Card, Button, Spinner } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [newCourses, setNewCourses] = useState([]);
  var temp = [];
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  var storageRef = firebase.storage();
  // var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
  // coverRef.getDownloadURL()
  // .then((URL) => {
  //     setUrl(URL)

  // })

  const courseref = firebase.firestore().collection("courses");

  function getCourses() {
    setLoading(true);
    const items = [];
    courseref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().published) {
          const course = doc.data();
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
      console.log(courses);

      //searchRef.value = 'a'

      // setLoading(false)
      // setTimeout(setLoading(true), 100)
      setTimeout(() => {
        // setSearchValue('')
        searchCourses();
        // resetSearch()
        setLoading(false);
      }, 200);
      // setSearchValue('a')
      // searchCourses()
      // resetSearch()
      // setLoading(false)
    });
  }

  useEffect(() => {
    getCourses();
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
    } else {
      setFiltered(false);
    }
  }

  const handleSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  function resetSearch() {
    setFiltered(false);
    setSearchValue("");
  }

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
      <div id="course-previews">
        {
          (filtered ? newCourses : courses).map((course) => (
            <Card className="p-3 mx-5 mb-3">
              <div className="row">
                <div className="col-md-6 col-lg-3 overflow-hidden">
                  {console.log(course.url)}
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
    </div>
  );
}
