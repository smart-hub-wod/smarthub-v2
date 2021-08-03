import React, { useState, useEffect } from "react"
import firebase from './firebase'
import { useParams } from "react-router";
import { Link } from 'react-router-dom'
import { ChevronDoubleLeft } from "react-bootstrap-icons";


export default function Lesson() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [lessonPlan, setLessonPlan] = useState();

    const courseref = firebase.firestore().collection("lessons").doc(id);

    function getCourse() {
        setLoading(true);
        courseref.get().then((doc) => {
            if (doc.exists) {
                setCourse(doc.data())
            }
            setLoading(false)
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
                <h1 className="text-shblue pt-3 text-center">Lesson not found</h1>
                <h4 className="text-center text-secondary mb-4">See my courses <Link to="/dashboard">here!</Link></h4>
            </>
        )
    }

    function extractData() {
        let menuList = ""
        for(let lesson in course.lessons) {
            menuList += `<h5>${lesson}</h5><br/>`
            for (let section in course.lessons[lesson]) {
                menuList += `<p>${section}</p><br/>`
                for (let item in course.lessons[lesson][section]) {
                    menuList += `<p>${item}</p><br/>`
                }
            }
        }
        setLessonPlan(menuList)
        return menuList
    }

    return (
        <>
            <div className="text-center">
                <h1 className="text-shblue mt-4">Lesson Module</h1>
                <p>Welcome to {course.name}</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-3 is-shblue text-white pt-3 text-center rounded-end">
                    {/* <h5>Lesson 1</h5>
                    <p className="active">1.1 - Content</p>
                    <p>1.2 - Quiz</p>
                    <br />
                    <h5>Lesson 2</h5>
                    <p>2.1 - Content</p>
                    <p>2.2 - Content</p>
                    <p>2.3 - Quiz</p> */}
                    {Object.keys(course.lessons).reverse().map((lessonNum) => { 
                        return(<h3>{lessonNum}</h3>)
                    })}
                    <br />
                </div>
                <div className="col-9 px-5">
                    <h5 className="text-shblue text-center">1.1 Content</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. </p>
                </div>
            </div>
        </>
    )
}