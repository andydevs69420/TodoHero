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
import SigninPage  from "../Pages/SigninPage/SigninPage";
import SignupPage  from "../Pages/SignupPage/SignupPage";
import TodoHeroApp from "../Pages/TodoHeroApp/TodoHeroapp";
    import Todos   from "../Pages/TodoHeroApp/Todos/Todos";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Hola!</div>}/>
                <Route path="signin" element={<SigninPage/>}/>
                <Route path="signup" element={<SignupPage/>}/>
                <Route path="todoheroapp" element={<TodoHeroApp/>}>
                    <Route index path="todos" element={<Todos/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;