import React, { useEffect, useState } from "react"
import firebase from './firebase'
import { Card, Button } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons';

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [newCourses, setNewCourses] = useState([]);

    const courseref = firebase.firestore().collection("courses");

    function getCourses() {
        setLoading(true);
        courseref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data())
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
                        <div key={course.id}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                        </div>
                    </Card>
                    
                ))
                : courses.map((course) => (
                    <Card className="p-3 mx-5 mb-3">
                        <div key={course.id}>
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                        </div>
                    </Card>
                    
                ))}
            </div>
        </div>
    )
}