/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React from "react";
import "./scss/xloading.css";


const XLoading = (props) => {

    return (
        <div className="xloading__overlay-bg position-fixed w-100 h-100">
            <div className="xloading__loading-panel position-fixed px-3 py-3 text-center bg-light rounded shadow">
                <div className="spinner-border text-primary mb-2" role="status"></div>
                <span className="d-block">loading...</span>
            </div>
        </div>
    );
}


export default XLoading;