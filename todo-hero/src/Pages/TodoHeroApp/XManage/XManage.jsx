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
import XButton from "../../../Components/XButton/XButton";
import XFab    from "../../../Components/XFab/XFab";


import LoginHandler from "../LogginHandler";

/*
 | API LINKS
 */ 
const NEW_TODO = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/insert";

console.log(NEW_TODO);

const NewTodo = ({id}) => {

    const onNewTodo = (e) => {
        e.preventDefault();

        let title,
            date ,
            time ,
            descr;
        
        title = document.getElementById("newtodo__title").value;
        date  = document.getElementById("newtodo__date" ).value;
        time  = document.getElementById("newtodo__time" ).value;
        descr = document.getElementById("newtodo__description").value;

        fetch(NEW_TODO, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                title : title, 
                date  : date , 
                time  : time ,
                descr : descr,
            })
        })
        .then((res) => res.json())
        .then((res_json) => {
            console.log(res_json);
        },
        (error) => console.log("Error transmitting data at " + NEW_TODO, error));
    }

    return (
        <div id={id} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content border-0 rounded-1 shadow-sm">
                    <div className="modal-header border-0">
                        <h5 className="modal-title">New Todo</h5>
                        <button type="button" className="btn-close rounded-circle" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id={"newtodo__" + id} action="#" method="GET" onSubmit={onNewTodo}>
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-12 pb-2">
                                        <XInput 
                                            id="newtodo__title" 
                                            iconClass="bi bi-list" 
                                            type="text" pattern="[a-zA-Z]+" 
                                            placeholder="Todo title" 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInput 
                                            id="newtodo__date" 
                                            iconClass="bi bi-calendar-fill" 
                                            type="date" 
                                            placeholder="Todo date" 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInput 
                                            id="newtodo__time" 
                                            iconClass="bi bi-clock-fill" 
                                            type="time" 
                                            placeholder="Todo time" 
                                            required/>
                                    </div>
                                    <div className="col-12 py-2">
                                        <div className="input-group">
                                            <textarea id="newtodo__description" className="form-control" cols="30" rows="4" placeholder="Description" required></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 pt-2">
                                        <XButton type="submit">
                                            SUBMIT
                                        </XButton>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer border-0">
                        <small className="small text-muted">Todo Adder</small>
                    </div>
                </div>
            </div>
        </div>
    );
}



const XManage = (props) => {

    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            
            {/*  */}
            <NewTodo id="xmanage__new-todo-modal" />

            {/*  */}
            <div className="d-block p-0 px-sm-2 w-100 h-100">
                <div id="xmanage__manage-controls-wrapper" className="d-block px-3 px-sm-0 pt-5 pb-4 pt-sm-2 pb-sm-3">
                    <XInput iconClass="bi bi-search" pattern="[a-zA-Z]+" placeholder="search"/>
                </div>
                <div id="xmanage__manage-list-wrapper" className="d-block position-relative">
                    <XManageList>
                        <XMLListItem 
                            title="Circumsation Tommorow" 
                            descrption="fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff" 
                            date="09/05/2022" 
                            time="01:08PM"/>
                    </XManageList>
                    <XFab id="xmanage__fab" 
                        iconClass="bi bi-file-plus-fill" 
                        buttonClass="btn-primary" 
                        size={40} 
                        dataBsToggle="modal" 
                        dataBsTarget="#xmanage__new-todo-modal"/>
                </div>
            </div>
        </section>
    );
}

export default XManage;