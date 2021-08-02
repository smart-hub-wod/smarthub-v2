import React, { useState, useEffect } from "react"
// import firebase from './firebase'
import firebase from 'firebase/app'
import { useParams } from "react-router";
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function Listing() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const courseref = firebase.firestore().collection("courses").doc(id);
    const { currentUser } = useAuth()
    const cartref = firebase.firestore().collection("users").doc(currentUser.uid);

    async function getCourse() {
        setLoading(true)
        await courseref.get().then((doc) => {
            if (doc.exists) {
                setCourse(doc.data())
                setLoading(false)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setLoading(false)
    }
    
    function addCourse() {
        cartref.update({
            cart: firebase.firestore.FieldValue.arrayUnion(course.id)
        });
    }

    useEffect(() => {
        getCourse();
    }, [])

    if(loading) {
        return <h1 className="text-shblue pt-3 text-center">Loading...</h1>
    }

    // Course not Found Error Page
    if(course.length === 0) {
        return (
            <>
                <h1 className="text-shblue pt-3 text-center">Course not found</h1>
                <h4 className="text-center text-secondary mb-4">See all courses <Link to="/courses">here!</Link></h4>
            </>
        )
    }

    return (
        <>
            <div>
                <h1 className="text-center text-shblue mt-5">{course.title}</h1>
                <h4 className="text-center text-secondary mb-4">{course.timeline}</h4>
            </div>
            <div className="row align-items-start justify-content-center my-4">
                <div className="col-6 text-white is-shblue p-4 rounded">
                {course.description}
                </div>
                <div className="col-4 text-center">
                    <Button bsPrefix="button-sh" onClick={addCourse}>Add to Cart</Button>
                    <p className="text-shblue mt-1">Only <span className="fs-3 fw-bold">${course.price} </span></p>
                </div>
            </div>
        </>
    )
}