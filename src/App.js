import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./login"
import Signup from "./signup"
import Dashboard from "./dashboard";
import NavBar from "./navbar"
import Home from "./home"
import About from "./about"
import Courses from "./courses"
import ContactUs from "./contact-us";
import Footer from "./footer";
import Privacy from "./privacy";
import Terms from "./terms";
import Page404 from "./404";
import Listing from "./listing";
import Settings from "./settings";
import AddCourse from "./add-course";
import ParentFAQ from "./parentfaq";
import Lesson from "./lesson-module";
import StudentDash from "./student-dash"
import Cart from "./cart";
import ForgotPassword from "./forgot-password";
// Add pages here!

import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute"
import Contact from "./contact";

function App() {
  return (
    <>
    <Router>
      <AuthProvider>
        <NavBar />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/settings" component={Settings} />
              <AdminRoute exact path="/add-course" component={AddCourse} />
              <PrivateRoute exact path="/lesson/:id/:child" component={Lesson} />
              <PrivateRoute path="/student-dashboard/:id" component={StudentDash} />
              <PrivateRoute path="/cart" component={Cart} />
              <Route exact path="/" component={Home} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route path="/meet-the-team" component={ContactUs} />
              <Route path="/courses" component={Courses} />
              <Route path="/home" component={Home} />
              <Route path="/terms-and-conditions" component={Terms} />
              <Route path="/privacy-policy" component={Privacy} />
              <Route path="/course-listing/:id" component={Listing} />
              <Route path="/parent-faq" component={ParentFAQ} />
              <Route path="/contact-us" component={Contact} />
              <Route path="*" component={Page404} />
              

              {/* Add Routes Here! */}

          </Switch>
        </AuthProvider>
        <Footer />
    </Router>
    </>

  )

}
export default App;
