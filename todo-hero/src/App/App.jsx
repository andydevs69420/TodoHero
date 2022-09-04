/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React from "react";
import "./scss/app.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 


/*
 | STYLES IMPORTS
 */ 
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";


/*
 | PAGES IMPORTS
 */ 
import SigninPage from "../Pages/SigninPage/SigninPage";
import SignupPage from "../Pages/SignupPage/SignupPage";



import { GoogleLogout } from "react-google-login";
// eslint-disable-next-line no-unused-vars
import { gapi } from "gapi-script"



const App = () => {
    


    const onGSignoutOk = () => {
        console.log("Ok");
    }

    const onGSignoutError = () => {
        console.log("Error logging out!");
    }
    
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<div>Hola!</div>}/>
                <Route exact path="signin" element={<SigninPage/>}/>
                <Route exact path="signup" element={<SignupPage/>}/>
                <Route exact path="todoheroapp" element={
                    <div>
                        <GoogleLogout className="btn btn-light justify-content-center align-items-center w-100 rounded"
                            clientId={process.env.REACT_APP_GOOGLE_API}
                            onLogoutSuccess={onGSignoutOk} 
                            onFailure={onGSignoutError} 
                            buttonText="Logout Google"
                        />
                    </div>
                }/>
            </Routes>
        </Router>
    );
}

export default App;