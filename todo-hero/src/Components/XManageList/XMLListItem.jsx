/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";



const XMLListItem = ({todoid, title, description, date, time, onClick, dataBsTarget, dataBsToggle}) => {

    const tileClick  = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return onClick?.call(null, todoid, title, description, date, time);
    }

    return (
        <div className="xmllistitem__list-item card position-relative border-0 rounded-0 shadow-sm" data-bs-toggle={dataBsToggle} data-bs-target={dataBsTarget} onClick={tileClick}>
            <div className="card-body">
                <h6 className="card-title text-truncate">{title}</h6>
                <p className="card-text small text-truncate text-muted">
                    {description?.substring(0, 80)}
                </p>
            </div>
            <div className="card-footer border-0 bg-transparent px-3 py-2">
                <span className="text-muted float-start">
                    <small className="small">DATE: &nbsp;</small>
                    <small className="small">{date}</small>
                </span>
                <span className="text-muted float-end">
                    <small className="small">TIME: &nbsp;</small>
                    <small className="small">{time}</small>
                </span>
            </div>
        </div>
    );
}

export default XMLListItem;