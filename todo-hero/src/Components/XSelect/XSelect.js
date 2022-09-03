/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */





import React, {useState} from "react";
import "./scss/xselect.css";

const XSelect = (props) => {

    const [currentValue, onValueUpdated] = useState("");

    // update event
    const onUpdate = (e) => onValueUpdated((old) => e.target.value);

    return (
        <div className="xselect__ig input-group position-relative rounded shadow">
            <span className="xselect__igt input-group-text position-absolute text-muted border-0">
                <i className={props.iconClass}></i>
            </span>
            <select id={props.id} className="xselect__fs form-select border-0 bg-light" type={props.type} name={props.name} placeholder={props.placeholder} value={currentValue} onChange={onUpdate}>
                {props.children}
            </select>
        </div>
    );
}

export default XSelect;