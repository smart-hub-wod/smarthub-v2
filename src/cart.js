import React from "react"
import { useState, useEffect } from "react"
import firebase from './firebase'
import { useAuth } from "./contexts/AuthContext.js"
import { Card } from 'react-bootstrap'

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth()
    const cartref = firebase.firestore().collection("users").doc(currentUser.uid);
    const courseref = firebase.firestore().collection("courses");

    async function getCart() {
        let courseInfo = []
        setLoading(true)
        await cartref.get().then((doc) => {
            if (doc.exists) {
                (doc.data().cart).map((course) => {
                    courseref.doc(course).get().then((doc) => {
                        if (doc.exists) {
                            setLoading(true)
                            courseInfo.push(doc.data())
                            console.log(doc.data())
                            setLoading(false)
                        }
                    })
                    setCourses(courseInfo)
                    
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        setLoading(false)
    }
    
    useEffect(() => {
        getCart();
    }, [])

    if(loading) {
        return <h1 className="text-shblue pt-3">Loading...</h1>
    }

    return (
        <div>
            <div className="text-center">
                <h1 className="text-shblue mt-4">Cart Summary</h1>
                {courses.map((course) => {
                   return (
                    <Card className="p-3 mx-5 mb-3">
                        <div className="row justify-content-start">
                            <div className="col-8">
                                <h3 className="text-start text-shblue">{course.title}</h3>
                                <p className="text-start">{course.description}</p>
                            </div>
                            <div className="col-4">
                                <h1 className="text-end text-shblue">${course.price}</h1>
                            </div>
                        </div>
                        
                    </Card>
                   )
                })}
            </div>
        </div>
    )
}