/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";



const XFab = ({id, iconClass, buttonClass, onClick, size, dataBsTarget, dataBsToggle}) => {
    return (
        <span id={id} className="d-inline-block rounded-circle shadow-sm">
            <button className={"btn " + buttonClass + " p-0 rounded-circle"} 
                onClick={onClick} 
                style={{width: size + "px", height: size + "px"}} 
                data-bs-toggle={dataBsToggle} 
                data-bs-target={dataBsTarget}>
                <i className={iconClass}></i>
            </button>
        </span>
    );
}

export default XFab;
