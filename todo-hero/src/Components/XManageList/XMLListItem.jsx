/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";



const XMLListItem = ({id, title, descrption, date, time, onDelete}) => {

    const deleteItem = () => onDelete?.call(null, id);

    return (
        <div className="xmllistitem__list-item card position-relative border-0 rounded-0 shadow-sm">
            
            <button className="xmllistitem__list-item-delete-btn btn btn-sm btn-primary border-0 bg-transparent position-absolute" onClick={deleteItem}>
                <i className="bi bi-trash-fill text-muted"></i>
            </button>

            <div className="card-body">
                <h6 className="card-title text-truncate">{title}</h6>
                <p className="card-text small text-truncate text-muted">
                    {descrption.substring(0, 80)}
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