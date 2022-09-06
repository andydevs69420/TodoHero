/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";


const XTopbar = (props) => {
    return (
        <nav className="d-none d-sm-block navbar navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <button className="navbar-toggler p-2 text-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + props.targetId} aria-controls={props.targetId} aria-expanded="false" aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span> */}
                    <span className="bi bi-list text-dark"></span>
                </button>
            </div>
        </nav>
    );
}

export default XTopbar;