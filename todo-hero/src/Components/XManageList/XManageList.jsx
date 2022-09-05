/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";
import "./scss/xmanagelist.css";


/*
 | LIST ITEM COMPONENT
 */ 
import XMLListItem from "./XMLListItem";

const XManageList = (props) => {
    return (
        <div id={props.id} className="xmanagelist__list d-flex flex-column flex-sm-row flex-wrap justify-content-start align-items-center align-content-evenly w-100 h-100">
            {props.children}
        </div>
    );
}

export {XManageList, XMLListItem};
