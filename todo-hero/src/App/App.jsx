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


import "@fortawesome/fontawesome-free/js/all";


/*
 | PAGES IMPORTS
 */ 
import SigninPage   from "../Pages/SigninPage/SigninPage";
import SignupPage   from "../Pages/SignupPage/SignupPage";
import TodoHeroApp  from "../Pages/TodoHeroApp/TodoHeroapp";
    import XTodos   from "../Pages/TodoHeroApp/XTodos/XTodos";
    import XManage  from "../Pages/TodoHeroApp/XManage/XManage";
    import XSubscription  from "../Pages/TodoHeroApp/XSubscription/XSubscription";
    import XAccount from "../Pages/TodoHeroApp/XAccount/XAccount";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Hola!</div>}/>
                <Route path="signin" element={<SigninPage/>}/>
                <Route path="signup" element={<SignupPage/>}/>
                <Route path="todoheroapp" element={<TodoHeroApp/>}>
                    <Route path="todos"        index element={<XTodos/>}/>
                    <Route path="manage"       index element={<XManage/>}/>
                    <Route path="subscription" index element={<XSubscription/>}/>
                    <Route path="account"      index element={<XAccount/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;