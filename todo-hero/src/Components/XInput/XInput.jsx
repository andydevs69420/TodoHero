/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, {useEffect, useState} from "react";
import "./scss/xinput.css";


const XInput = (props={}) => {

    const [currentValue, onValueUpdated] = useState("");


    useEffect(() => {
        onValueUpdated(props.value?props.value : "");
    }, [props.value]);

    // update event
    const onUpdate = (e) => {
        props.onChange
        ?.call(
            null, e.target.value
        );
        onValueUpdated(e.target.value);
    };

    return (
        <div className="xinput__ig input-group position-relative rounded shadow-sm">
            <span className={
                "xinput__igt input-group-text position-absolute " + 
                ((props.bgTheme)?props.bgTheme:"") + " " +
                ((props.fgTheme)?props.fgTheme:"text-muted") + " " + 
                "border-0"}>
                <i className={props.iconClass}></i>
            </span>
            <input id={props.id} className="xinput__fc form-control border-0 bg-light" type={props.type} name={props.name} pattern={props.pattern} placeholder={props.placeholder} value={currentValue} onChange={onUpdate} required={props.required && true} />
        </div>
    );

}


export default XInput;

