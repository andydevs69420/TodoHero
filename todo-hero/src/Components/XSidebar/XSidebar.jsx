/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./scss/xsidebar.css";


/*
 | ASSETS/IMAGES
 */
import NAVLOGO from "../../Assets/Images/todo-bg.png";


const XSidebar = (props) => {

    const location = useLocation();
    /**  */ 
    const [active, onActive] = useState({
        todo    : "",
        manage  : "",
        plan    : "",
        account : "",
    });

    useEffect(() => {
        let state = ({
            todos   : "",
            manage  : "",
            plan    : "",
            account : "",
        });

        let last = location.pathname.split("/");
            last = last[last.length-1];
        
        if (!last.match("[a-zA-z]+"))
            state["todos"] = "active";
        else
            state[ last  ] = "active";
    
        onActive(state)
    }, [location]);

    return (
        <div className="xsidebar__shape-wrapper d-block w-auto h-100">
            <div id={props.id} className="xsidebar__collapse collapse collapse-horizontal show">
                <nav className="xsidebar__nav d-block nav border shadow-sm">
                    
                    {/* app brand */}
                    <div className="d-none d-sm-block container-fluid my-3">
                        <img className="img-fluid" src={NAVLOGO} alt="app-brand"/>
                        <h3 className="diplay-3 text-center text-success">TodoHero</h3>
                    </div>
                    
                    {/* link list */}
                    <ul className="navbar-nav flex-row flex-sm-column justify-content-around px-1 py-3 p-sm-1">
                        <li className="nav-item my-0 mb-sm-1">
                            <Link className="nav-link p-0" to="todos">
                                <span className={"xsidebar__link-btn text-dark rounded " + active.todos}>
                                    <i className="bi bi-clock-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Todos</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 my-sm-1">
                            <Link className="nav-link p-0" to="manage">
                                <span className={"xsidebar__link-btn text-dark rounded " + active.manage}>
                                    <i className="bi bi-grid-1x2-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Manage</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 my-sm-1">
                            <Link className="nav-link p-0" to="subscription">
                                <span className={"xsidebar__link-btn text-dark rounded " + active.subscription}>
                                    <i className="bi bi-cart-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Subscription</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 mt-sm-1">
                            <Link className="nav-link p-0" to="account">
                                <span className={"xsidebar__link-btn text-dark rounded " + active.account}>
                                    <i className="bi bi-person-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Account</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default XSidebar;