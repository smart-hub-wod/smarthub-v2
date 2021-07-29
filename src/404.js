import React from "react"




export default function Page404() {
  return (
    <>
      <div className = "text-center">
        <img src={process.env.PUBLIC_URL + "logo512.png"} alt="" />
        <h1 className = "text-shblue mt-4" > 404 Error < /h1>
        <p> Sorry that URL doesn 't exist!</p>
      </div>
    </>
  )
}
