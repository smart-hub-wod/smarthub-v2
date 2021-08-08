import React, { useEffect, useState } from "react"
import firebase from './firebase'
import 'firebase/storage';  
import { Card, Button } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [newCourses, setNewCourses] = useState([]);
    var storageRef = firebase.storage()
    // var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
                    // coverRef.getDownloadURL()
                    // .then((URL) => {
                    //     setUrl(URL)
                        
                    // })

    const courseref = firebase.firestore().collection("courses");

    function getCourses() {
        setLoading(true);
        courseref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                
                const course = doc.data()
                var coverRef = storageRef.ref(`${course.id}/${course.id}.jpeg`);
                coverRef.getDownloadURL()
                .then((URL) => {
                    course.url = URL
                }).then(() => {
                    console.log(course.url)
                })
                items.push(course) 
                             
            })
            setCourses(items)
            setLoading(false)       
        })
    }

    useEffect(() => {
        getCourses();
    }, [])

    function searchCourses() {
        let search = document.getElementById("search-bar")
        let previewDiv = document.getElementById("course-previews")
        if (search.value === "") {
            setFiltered(false)
        } else {
            setNewCourses(courses.filter((course) => course.title.toLowerCase().includes(search.value.toLowerCase())))
            console.log(search.value + " " + newCourses.length)
            if (newCourses.length === 0) {
                
            } else {
                setFiltered(true)
            }
        }
        
    }

    function resetSearch() {
        let search = document.getElementById("search-bar")
        search.value = ""
        searchCourses()
    }

    if(loading) {
        return <h1 className="text-shblue pt-3">Loading...</h1>
    }

    return (
        <div>
            <h1 className="text-shblue pt-3 text-center">Courses</h1>
            <div className="text-start mx-5 d-flex justify-content-center">
                <input type="text" className="form-control" placeholder="Search for Courses..." id="search-bar" aria-label="Search for Courses" aria-describedby="Search bar for course selection" />
                <Button bsPrefix="button-sh" onClick={searchCourses}><Search color="white"/></Button>
            </div>
            <div className="text-start mx-5 pt-3 d-flex justify-content-center">
                <Button bsPrefix="button-sh" className="text-center mb-3" onClick={resetSearch}>Reset Search</Button>
            </div>
            <div id="course-previews">
                {filtered ?
                newCourses.map((course) => (
                    <Card className="p-3 mx-5 mb-3">
                        <div className="row">
                        <div className="col-3 overflow-hidden">
                            <img height="250" src={course.url} />
                        </div>
                        <div key={course.id} className="col-9">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <Link to={`/course-listing/${course.id}`}><Button bsPrefix="button-sh">View Course</Button></Link>
                        </div>
                        </div>
                    </Card>
                    
                ))
                : courses.map((course) => (
                    <Card className="p-3 mx-5 mb-3">
                        <div className="row">
                        <div className="col-3 overflow-hidden">
                            <img height="250" src={course.url} />
                        </div>
                        <div key={course.id} className="col-9">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <Link to={`/course-listing/${course.id}`}><Button bsPrefix="button-sh">View Course</Button></Link>
                        </div>
                        </div>
                    </Card>
                    
                ))}
            </div>
        </div>
    )
}