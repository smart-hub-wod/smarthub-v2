import React from "react"
import { useParams } from "react-router";

export default function Listing() {
    let { id } = useParams();

    return (
        <div>
            <h1>[Course Listing]</h1>
            <h1>{id}</h1>
        </div>
    )
}