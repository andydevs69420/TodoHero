/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React, { useEffect, useRef } from "react";
import "./scss/xavatar.css";


const XAvatar = ({id, src, alt, size="50%"}) => {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.style.setProperty("padding-top", size, "important");
        ref.current.style.setProperty("width", size, "important");
    }, [size]);

    return (
        <div ref={ref} id={id} className="xavatar__rounded-wrapper position-relative rounded-circle bg-white shadow-sm">
            <div className="xavatar__content d-block position-absolute rounded-circle" style={{backgroundImage: `url("${src}")`}}></div>
        </div>
    );
}


export default XAvatar;