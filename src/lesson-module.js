import React from "react"
import { useParams } from "react-router";

export default function Lesson() {
    let { id } = useParams();

    return (
        <>
            <div className="text-center">
                <h1 className="text-shblue mt-4">Lesson Module</h1>
                <p>Welcome to Course #{id}!</p>
            </div>
            <div className="row justify-content-center">
                <div className="col-3 is-shblue text-white pt-3 text-center rounded-end">
                    <h5>Lesson 1</h5>
                    <p className="active">1.1 - Content</p>
                    <p>1.2 - Quiz</p>
                    <br />
                    <h5>Lesson 2</h5>
                    <p>2.1 - Content</p>
                    <p>2.2 - Content</p>
                    <p>2.3 - Quiz</p>
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