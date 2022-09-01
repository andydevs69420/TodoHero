/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


const XRoundLink = (props) => {
    return (
        <a id={props.id} 
            className="d-flex flex-column align-items-center justify-content-center btn btn-light p-0 rounded-circle shadow" 
            role="button" 
            href={props.href} 
            style={{width: "40px", height: "40px", fontSize: "1.7rem"}}>
            <i className={props.iconClass + " p-0 m-0"}></i>
        </a>
    );
}

export default XRoundLink;