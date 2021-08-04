import React, { useState, useEffect } from "react"
import firebase from './firebase'
import { useParams } from "react-router";
import { Link } from 'react-router-dom'


export default function Lesson() {
    let { id } = useParams();
    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(-1);

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

    function handleLessonChange(index) {
        setCurrentLesson(index)
        console.log(index)
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
                    {/* {Object.keys(course.lessons).map((lessonNum) => { 
                        return(
                            <> 
                                <h3>{lessonNum}</h3>
                                <LessonBreakdown breakdown={course.lessons[lessonNum]}/>
                            </>
                        )
                    })} */}
                    {course.lessons.map((lessonNum, index) => { 
                        return(
                            <> 
                                <h5 onClick={() => handleLessonChange(index)}>{lessonNum}</h5>
                            </>
                        )
                    })}
                    <br />
                </div>
                <div className="col-9 px-5">
                    {/* <h5 className="text-shblue text-center">1.1 Content</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac interdum purus. </p> */}
                    <ContentBox lssn={currentLesson} courseInfo={course}/>
                </div>
            </div>
        </>
    )
}

// Comp Eng
// function LessonBreakdown(props) { 
//     console.log(props.breakdown)
//     return (
//         <>
//             {Object.keys(props.breakdown).map((sectionNum) => { 
//                 return(
//                     <>
//                         <h6>{sectionNum}</h6>
//                     </>
//                 )
//             })}
//         </>
//     )
//     // return ("Hello")
// }

function ContentBox(props) {
    console.log(props.courseInfo.lessonContent[props.courseInfo.lessons[props.lssn]])
    let lessn = props.courseInfo.lessonContent[props.courseInfo.lessons[props.lssn]]
    let content = ''
    if (props.lssn !== -1) {
        if (Object.keys(lessn)[0] === 'article') {
            content = lessn['article']
        } else if (Object.keys(lessn)[0] === 'video') {
            content = <iframe width="560" height="315" src={`https://www.youtube.com/embed/${lessn['video']}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        } else {
            content = <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScaIL8EfzCXsDhHY4OPcpqzPOWWT4ZhurafD682aO5frsvqGA/viewform?embedded=true" width="640" height="1316" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        }
    }

    return (
        <>
            {props.lssn === -1 ?
            <p>Welcome! Click a lesson number on the left to begin!</p> :
            <>
            <h3 className="text-shblue">{props.courseInfo.lessons[props.lssn]}</h3>
            {content}
            </>}
        </>
    )
}