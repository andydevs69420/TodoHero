/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";
import { XManageList, XMLListItem } from "../../../Components/XManageList/XManageList";
import "./scss/xmanage.css";


const XManage = (props) => {

    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-md-2 w-100 h-100">
            <div className="container-fluid p-0 px-md-2">
                Management
                <XManageList>

                    <XMLListItem />
                    <XMLListItem />
                    <XMLListItem />
                    <XMLListItem />
                  
                   
                    
                </XManageList>
            </div>
        </section>
    );
}

export default XManage;