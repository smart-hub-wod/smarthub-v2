import React, { useState, useEffect } from "react"
// import firebase from './firebase'
import firebase from 'firebase/app'
import { useParams } from "react-router";
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext.js"
import { ChatRight } from "react-bootstrap-icons";

export default function Listing() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [kids, setKids] = useState([])

    const courseref = firebase.firestore().collection("courses").doc(id);
    const { currentUser } = useAuth()
    const cartref = firebase.firestore().collection("users").doc(currentUser.uid);

    async function getCourse() {
        setLoading(true)
        await courseref.get().then((doc) => {
            if (doc.exists) {
                setCourse(doc.data())
                cartref.get().then((doc) => {
                    if (doc.exists) {
                        setKids(Object.keys(doc.data().children))
                    }
                })
                console.log(kids)
                kids.map((kid) => {
                    console.log(kid)
                })
                setLoading(false)
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

    return (
        <>
            
            {/* How can I use the course.bannerImg variable i added onto firebase? */}
            <div className="course-banner-img w-100" stlye={{backgrondImage: `url(${course.bannerImg})`}}/>
            {console.log(course.bannerImg)}

            <div className="course-banner">
                
                <Container>
                    <h1 className="text-center text-white mt-5">{course.title}</h1>
                    <h4 className="text-center text-white text-secondary mb-4">{course.timeline}</h4>
                </Container>
                
            </div>
            {/* <div className="text-center w-100 course-container"> */}
                <Container className="course-container px-3 pt-4">
                    <div className="row align-items-start justify-content-center ">
                        <div className="col-4 text-center">
                            <img className="img-fluid m-3" src="https://th.bing.com/th/id/OIP.TCSkGnIfl1fIQieMpI1RVAHaE7?w=246&h=180&c=7&o=5&pid=1.7" alt="course-pic" />
                            <h2 className="text-shblue text-align-left my-4"> Choose your student: </h2>
                            <select className="form-select mb-3" defaultValue="0" aria-label="Default select example" id="nameSelect">
                                    {kids ? kids.map((kid) => {
                                        return (<option value={kid}>{kid}</option>)
                                    }) : <h1>Loading</h1>}
                            </select>
                            
                            <p className="text-shblue mt-1">Only <span className="fs-3 fw-bold">${course.price} </span></p>
                        </div>
                        <div className="col-6 text-white is-shblue py-4 mt-3 rounded">

                            <h2> Software Engineering </h2>
                            {course.description}

                            <hr/>
                            <Button className="w-100" bsPrefix="button-sh" onClick={addCourse}> Add to Cart</Button>
                            <hr/>
                            <Row>
                                <Col className="justify-content-center" xs={6}>
                                    <Button bsPrefix="button-sh" size="lg"> Add to wish list</Button>
                                </Col>

                                <Col xs={6}>
                                    <h3> bunch of icons </h3>
                                </Col>
                            </Row>
                            <div className="course-includes">
                                <h2> Includes: </h2>
                            {/* use some sort of looping? */}
                                <Row>
                                    <Col>
                                        <h3> Articles </h3>
                                    </Col>
                                    <Col>
                                        6
                                    </Col>
                                </Row>
                            </div>
                            
                            
                        </div>
                    </div>
                </Container>
            {/* </div> */}
        </>
    )
}
