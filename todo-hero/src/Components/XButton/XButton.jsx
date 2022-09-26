/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";

const XButton = (props={}) => {

    return (
        <span className="d-block rounded shadow">
            <button id={props.id} className="btn btn-primary border-0 w-100" 
                type={props.type} 
                style={props.style} 
                data-bs-target={props.dataBsTarget} 
                data-bs-toggle={props.dataBsToggle} 
                data-bs-dismiss={props.dataBsDismiss} 
                aria-label={props.ariaLabel}
                onClick={props.onClick}>
                {props.children}
            </button>
        </span>
    );

}


export default XButton;
