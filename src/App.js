import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import NavBar from "./navbar";
import Home from "./home";
import About from "./about";
import Courses from "./courses";
import MeetTeam from "./meet-team";
import Footer from "./footer";
import Privacy from "./privacy";
import Page404 from "./404";
import Listing from "./listing";
import Settings from "./settings";
import AddCourse from "./add-course";
import AddPromo from "./add-promo";
import ParentFAQ from "./parentfaq";
import TeacherFAQ from "./teacherfaq";
import Lesson from "./lesson-module";
import StudentDash from "./student-dash";
import AdminProfile from "./adminProfile";
import Cart from "./cart";
import ForgotPassword from "./forgot-password";
import Checkout from "./checkout";
import AddAdmin from "./add-admin";
import EditCourse from "./edit-course";
import StudentZone from "./student-zone";
// Add pages here!

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DevRoute from "./DevRoute";
import Contact from "./contact";
import { Certificate } from "./certificate";

function App() {
  // const initialOptions = {
  //   "client-id": "AYsA-yAUvEUvrOnjDoXqYVytOnxfG7787K6LfZRozQQTT7bqy9fD8-R07jw6xao7_PO4X5swVfEzZiBd",
  //   currency: "CAD",
  //   intent: "capture",
  // };

  return (
    <>
      <Router>
        <AuthProvider>
          {/* <PayPalScriptProvider options={initialOptions}> */}
          <NavBar />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <AdminRoute exact path="/add-course" component={AddCourse} />
            <AdminRoute exact path="/add-profile" component={AdminProfile} />
            <AdminRoute exact path="/edit-course/:id" component={EditCourse} />
            <PrivateRoute exact path="/lesson/:id/:child" component={Lesson} />
            <PrivateRoute path="/student-dashboard/:id" component={StudentDash} />
            <DevRoute path="/add-admin" component={AddAdmin} />
            <DevRoute path="/add-promo" component={AddPromo} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/certificate/:child/:course" component={Certificate} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
            {/* below is a way to pass props to components */}
            <Route path="/meet-the-team" component={MeetTeam} />
            <Route path="/courses" component={Courses} />
            <Route path="/home" component={Home} />
            <Route path="/terms-and-conditions" component={Privacy} />
            <Route path="/course-listing/:id" component={Listing} />
            <Route path="/parent-faq" component={ParentFAQ} />
            <Route path="/teacher-faq" component={TeacherFAQ} />
            <Route path="/contact-us" component={Contact} />
            <Route path="/student-zone" component={StudentZone} />
            <Route path="*" component={Page404} />

            {/* Add Routes Here! */}
          </Switch>
          {/* </PayPalScriptProvider> */}
        </AuthProvider>
        <Footer />
      </Router>
    </>
  );
}
export default App;
