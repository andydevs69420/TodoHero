/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React from "react";
import "./scss/xinput.css";


const XInputRaw = (props) => {
    return (
        <div className="xinput__ig input-group position-relative rounded shadow-sm">
            <span className="xinput__igt input-group-text position-absolute text-white border-0 bg-primary">
                <i className={props.iconClass}></i>
            </span>
            <input id={props.id} 
                className="xinput__fc form-control border-0 bg-light" 
                type={props.type} 
                name={props.name} 
                pattern={props.pattern} 
                placeholder={props.placeholder} 
                value={props.value} 
                onChange={props.onChange} 
                required={props.required && true} 
                min={props.min}
                max={props.max}/>
        </div>
    );
}

export default XInputRaw;