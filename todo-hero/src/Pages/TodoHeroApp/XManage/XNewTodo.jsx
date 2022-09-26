/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, { useState } from "react";

/*
 | OTHER COMPONENTS
 */ 
import XInputRaw from "../../../Components/XInput/XInputRaw";


import LoginHandler from "../LogginHandler";


/*
 | API LINKS
 */ 
function getNewTodoLink()
{
    const NEW_TODO  = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/insert";
    return NEW_TODO;
}



function getDateToday()
{
    let date = new Date();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();
        let yyyy = date.getFullYear();
    
    if (mm < 10)
        mm = "0" + mm;
    if (dd < 10)
        dd = "0" + dd;
    
    return `${yyyy}-${mm}-${dd}`;
}

const XNewTodo = ({id, onSuccess}) => {

    const [serverMessage, onServerMessageUpdate] = useState("");

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

        fetch(getNewTodoLink(), {
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
            if (res_json.status === "ok")
            {   
                onServerMessageUpdate(res_json.message);
                onSuccess?.call();
                return cleanFields();
            }

            return onServerMessageUpdate(res_json.message);
        },
        (error) => console.log("Error transmitting data at " + getNewTodoLink()));
    }


    const closeModal = () => {
        onServerMessageUpdate("");
        cleanFields();
    }

    const cleanFields = () => {
        document.getElementById("newtodo__title").value = "";
        document.getElementById("newtodo__date" ).value = "";
        document.getElementById("newtodo__time" ).value = "";
        document.getElementById("newtodo__description").value = "";
    }

    return (
        <div id={id} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content border-0 rounded-1 shadow-sm">
                    <div className="modal-header border-0">
                        <h5 className="modal-title">New Todo</h5>
                        <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id={"newtodo__" + id} action="#" method="GET" onSubmit={onNewTodo}>
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-12">
                                        {(serverMessage.length > 0) && 
                                            <div className="alert alert-danger show" role="alert">
                                                <strong>{serverMessage}</strong>
                                            </div>
                                        }
                                    </div>
                                    <div className="col-12 pb-2">
                                        <XInputRaw 
                                            id="newtodo__title" 
                                            iconClass="bi bi-vector-pen" 
                                            type="text" pattern="[\sA-Z]+" 
                                            placeholder="Todo title" 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInputRaw 
                                            id="newtodo__date" 
                                            iconClass="bi bi-calendar-fill" 
                                            type="date" 
                                            placeholder="Todo date" 
                                            min={getDateToday()} 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInputRaw 
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
                                    <div className="col-12 py-2">
                                        <span className="d-inline-block w-100 rounded shadow-sm">
                                            <button className="btn btn-primary w-100">
                                                ADD TODO
                                            </button>
                                        </span>
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


export default XNewTodo;