/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React, { useState } from "react";


function reformat(date)
{
    let split = date?.split("-");
    return `${split[1]}/${split[2]}/${split[0]}`;
}

const XTLListItem = ({todoid, title, description, created_at, date, time, onClick, dataBsTarget, dataBsToggle}) => {

    const [percentage, updatePercentage] = useState("0");
    useState(() => {
        let start, sched, now;

        start = new Date(created_at).getTime();
        sched = new Date(reformat(date) + " " + time).getTime();
        now   = Date.now();

        let perc = ((now - start) /  (sched - start)) * 100;
            perc = (perc > 100)? 100 : parseInt(perc)
        
        updatePercentage(perc);
    }, [date, time]);

    const tileClick  = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return onClick?.call(null, todoid, title, description, date, time);
    }

    return (
        <div className="xtllistitem__list-item card position-relative border-0 rounded-0 shadow-sm" data-bs-toggle={dataBsToggle} data-bs-target={dataBsTarget} onClick={tileClick}>
            <div className="card-body">
                <h6 className="card-title text-truncate">{title}</h6>
                <div className="progress" style={{height: "3px"}}>
                    <div className={"progress-bar rounded-pill " + (() => {
                        if (percentage < 25)
                            return "bg-primary";
                        else if (percentage < 50)
                            return "bg-warning";
                        else if (percentage < 75)
                            return "bg-secondary";
                        else
                            return "bg-danger";
                    })()}
                        role="progressbar" 
                        aria-label="progress-bar" 
                        aria-valuenow={percentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        style={{width: percentage + "%"}}></div>
                </div>
                <small className="small text-muted float-end">{percentage}%</small>
            </div>
            <div className="card-footer border-0 bg-transparent px-3 pb-2">
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

export default XTLListItem;