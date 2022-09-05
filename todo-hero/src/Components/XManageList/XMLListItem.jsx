/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";



const XMLListItem = ({date, time, title, descrption}) => {

    return (
        <div className="xmllistitem__list-item card border-0 rounded-0 shadow-sm">
            <div className="card-body">
                <h6 className="card-title text-truncate">{title}</h6>
                <p className="card-text small text-truncate">
                    {descrption.substring(0, 80)}
                </p>
            </div>
            <div className="card-footer border-0 bg-transparent px-2 py-1">
                <span className="text-muted float-start">
                    <small className="small">DATE: &nbsp;</small>
                    <small className="small">{date}</small>
                </span>
                <span className="text-muted float-end">
                    <small className="small">TIME: &nbsp;</small>
                    <small className="small">{date}</small>
                </span>
            </div>
        </div>
    );
}

export default XMLListItem;