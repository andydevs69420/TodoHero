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
        <div id={props.id} className="xmanagelist__list d-flex flex-column flex-nowrap flex-md-row flex-md-wrap justify-content-start align-items-start w-100 h-100">
            {props.children}
        </div>
    );
}

export {XManageList, XMLListItem};
