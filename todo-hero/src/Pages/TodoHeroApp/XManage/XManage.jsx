/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";
import { XManageList, XMLListItem } from "../../../Components/XManageList/XManageList";
import "./scss/xmanage.css";


const XManage = (props) => {

    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            <div className="container-fluid p-0 px-sm-2">
                <div id="xmanage__manage_list-wrapper">
                    <XManageList>
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                        <XMLListItem />
                    </XManageList>
                </div>
            </div>
        </section>
    );
}

export default XManage;