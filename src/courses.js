import React, { useEffect, useState } from "react"
import firebase from './firebase'
import { Card } from 'react-bootstrap'

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

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

    if(loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1 className="text-shblue pt-3">Courses</h1>
            {courses.map((course) => (
                <Card className="p-3 m-5">
                    <div key={course.id}>
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                </Card>
                
            ))}
        </div>
    )
}