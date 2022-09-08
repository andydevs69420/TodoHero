/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";
import "./scss/xtodolist.css";


/*
 | LIST ITEM COMPONENT
 */ 
import XTLListItem from "./XTLListItem";

const XTodoList = (props) => {
    return (
        <div id={props.id} className="xtodolist__list d-flex flex-column flex-nowrap flex-md-row flex-md-wrap justify-content-start align-items-baseline w-100 /*h-100*/">
            {props.children}
        </div>
    );
}

export {XTodoList, XTLListItem};
