/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./scss/todoheroapp.css";



/*
 | COMPONENTS
 */
import XSidebar from "../../Components/XSidebar/XSidebar";
import XTopbar from "../../Components/XTopbar/XTopbar";
import { useNavigate } from "react-router-dom";
import LoginHandler from "./LogginHandler";


const TodoHeroApp = (props) => {

    const navigate = useNavigate();

    useEffect(() => {

        if (!LoginHandler.isLoggedin())
        return navigate("/signin");

    }, [navigate]);

    return (
        <div className="d-flex flex-row flex-nowrap position-relative w-100 h-100">
            <XSidebar id="todoheroapp__sidebar"/>
            <div className="todoheroapp__content-wrap d-block w-100 h-100">
                <XTopbar targetId="todoheroapp__sidebar"/>
                <div className="todoheroapp__view-wrapper d-block">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default TodoHeroApp;
