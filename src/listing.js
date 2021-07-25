import React, { useState, useEffect } from "react"
import firebase from './firebase'
import { useParams } from "react-router";
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Listing() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);

    const courseref = firebase.firestore().collection("courses");

    function getCourse() {
        setLoading(true);
        courseref.onSnapshot((querySnapshot) => {
            let items = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().id === parseInt(id)) {
                    items = doc.data()
                }
            })
            setCourse(items)
            setLoading(false)
            console.log(course)
        })
    }

    useEffect(() => {
        getCourse();
    }, [])

    if(loading) {
        return <h1 className="text-shblue pt-3">Loading...</h1>
    }

    return (
        <>
            <div>
                <h1 className="text-center text-shblue mt-5">{course.title}</h1>
                <h4 className="text-center text-secondary mb-4">{course.timeline}</h4>
            </div>
            <div className="row align-items-start justify-content-center my-4">
                <div className="col-6 text-white is-shblue p-2 rounded">
                {course.description}
                </div>
                <div className="col-4 text-center">
                    <Link to="/"><Button bsPrefix="button-sh">Add to Cart</Button></Link>
                    <p className="text-shblue mt-1">Only <span className="fs-3 fw-bold">${course.price} </span></p>
                </div>
            </div>
        </>
    )
}