/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";

const XButton = (props={}) => {

    return (
        <span className="d-block shadow">
            <button id={props.id} className="btn btn-primary border-0 w-100" onClick={props.onClick}>
                {props.children}
            </button>
        </span>
    );

}

export default XButton;
