import React, { useState, useEffect } from "react"
// import firebase from './firebase'
import firebase from 'firebase/app'
import 'firebase/storage';  
import { useParams } from "react-router";
import { Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"

export default function Listing() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [kids, setKids] = useState()
    const [url, setUrl] = useState("")
    var storageRef = firebase.storage()
    //var coverRef = firebase.storage().ref(`${id}/software-engineering.jpeg`);

    const courseref = firebase.firestore().collection("courses").doc(id);
    const { currentUser } = useAuth()
    const cartref = firebase.firestore().collection("users").doc(currentUser.uid);

    async function getCourse() {
        setLoading(true)
        await courseref.get().then((doc) => {
            if (doc.exists) {
                setCourse(doc.data())
                cartref.get().then((kid) => {
                    if (kid.exists) {
                        setKids(kid.data())
                    }
                    setLoading(true)
                    console.log(course)
                    var coverRef = storageRef.ref(`${id}/${id}.jpeg`);
                    coverRef.getDownloadURL()
                    .then((URL) => {
                        setUrl(URL)
                        
                    })
                    setLoading(false)
                })
                console.log(kids, 'Kids')  
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setLoading(false)
    }

    function addCourse() {
        const nameBar = document.querySelector('#nameSelect')
        console.log(nameBar.value)
        // cartref.update({
        //     cart: firebase.firestore.FieldValue.arrayUnion(course.id)
        // });

        cartref.update({
            [`cart.${nameBar.value}`]: firebase.firestore.FieldValue.arrayUnion(course.id)
        })
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
//height="100" width="300"
    return (
        <>
            <div> 
                <div className="d-flex justify-content-center">
                    <img height="150" className="rounded-pill mt-3" src={url} />
                </div>
                <h1 className="text-center text-shblue mt-3">{course.title}</h1>
                <h4 className="text-center text-secondary mb-4">{course.timeline}</h4>
            </div>
            <div className="row align-items-start justify-content-center my-4">
                <div className="col-6 text-white is-shblue p-4 rounded">
                <p>{course.description}</p>
                <h5>Includes {course.modules} Learning Modules!</h5>
                </div>
                {kids ? <div className="col-4 text-center">
                    {kids ? (Object.keys(kids['children']).length > 0 ?
                    <select className="form-select mb-3" defaultValue="0" aria-label="Default select example" id="nameSelect">
                        {kids ? Object.keys(kids['children']).map((kid) => {
                            return (<option value={kids['children'][kid]['name']} key={kid}>{kids['children'][kid]['name']}</option>)
                        }) : <h1>Loading</h1>}
                    </select> :
                    <Alert variant={'primary'}>
                    Add a student to your account to purchase courses!
                    </Alert>) : <p>Loading</p>}
                    {kids ? Object.keys(kids['children']).length > 0 ? <Button bsPrefix="button-sh" onClick={addCourse}>Add to Cart</Button> : <Button variant="secondary" disabled>Add to Cart</Button> : <p>Loading</p>}
                    <p className="text-shblue mt-1">Only <span className="fs-3 fw-bold">${course.price} </span></p>
                </div> : <h1>Loading...</h1>}
            </div>
        </>
    )
}
