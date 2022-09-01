/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, {useState} from "react";
import "./scss/xinput.css";


const XInput = (props={}) => {

    const [currentValue, onValueUpdated] = useState(() => "");

    // update event
    const onUpdate = (e) => onValueUpdated((old) => e.target.value);

    return (
        <div className="xinput__ig input-group position-relative rounded shadow">
            <span className="xinput__igt input-group-text position-absolute text-muted border-0">
                <i className={props.iconClass}></i>
            </span>
            <input id={props.id} className="xinput__fc form-control border-0" type={props.type} name={props.name} placeholder={props.placeholder} value={currentValue} onChange={onUpdate}/>
        </div>
    );

}

export default XInput;

