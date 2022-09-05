/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React from "react";
import { XManageList, XMLListItem } from "../../../Components/XManageList/XManageList";
import "./scss/xmanage.css";


/*
 | OTHER COMPONENTS
 */ 
import XInput  from "../../../Components/XInput/XInput";


const XManage = (props) => {

    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            <div className="d-block p-0 px-sm-2 w-100 h-100">

                <div id="xmanage__manage-controls-wrapper" className="d-block px-3 px-sm-0 pt-5 pb-4 pt-sm-2 pb-sm-3">
                    <XInput iconClass="bi bi-search" pattern="[a-zA-Z]+" placeholder="search"/>
                </div>

                <div id="xmanage__manage-list-wrapper" className="d-block position-relative">
                    <XManageList>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="ffffff"
                            date="09/05/2022"/>
                        
                    </XManageList>
                </div>
            </div>
        </section>
    );
}

export default XManage;