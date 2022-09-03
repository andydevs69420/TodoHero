/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import $ from "jquery/dist/jquery";


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

window.$ = window.jQuery = $;

const App = () => {
    
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<div>Hola!</div>}/>
                <Route exact path="signin" element={<SigninPage/>}/>
                <Route exact path="signup" element={<SignupPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;