/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";
import { Link } from "react-router-dom";
import "./scss/xsidebar.css";


const XSidebar = (props) => {

    return (
        <div className="xsidebar__shape-wrapper d-block w-auto h-100">
            <div id="collapseWidthExample" className="xsidebar__collapse collapse collapse-horizontal show">
                <nav className="xsidebar__nav d-block nav border shadow-sm">
                    <ul className="navbar-nav flex-row flex-sm-column justify-content-around px-1 py-3 p-sm-1">
                        <li className="nav-item my-0 mb-sm-1">
                            <Link className="nav-link p-0" to="todos">
                                <span className="xsidebar__link-btn text-muted rounded active">
                                    <i className="bi bi-clock-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Todos</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 my-sm-1">
                            <Link className="nav-link p-0" to="todos">
                                <span className="xsidebar__link-btn text-muted rounded">
                                    <i className="bi bi-person-fill"></i>
                                    <span className="d-none d-sm-inline-block ms-2">Todos</span>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 my-sm-1">
                            <Link className="nav-link p-0" to="todos">
                                <span className="xsidebar__link-btn text-muted rounded">
                                    <i className="bi bi-person-fill"></i>
                                </span>
                            </Link>
                        </li>
                        <li className="nav-item my-0 mt-sm-1">
                            <Link className="nav-link p-0" to="todos">
                                <span className="xsidebar__link-btn text-muted rounded">
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