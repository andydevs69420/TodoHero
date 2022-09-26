/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, { useEffect, useState } from "react";

/*
 | OTHER COMPONENTS
 */ 
import XInputRaw from "../../../Components/XInput/XInputRaw";


import LoginHandler from "../LogginHandler";


/*
 | API LINKS
 */ 
function getUpdateTodoLink()
{
    const NEW_TODO  = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/";
    return NEW_TODO;
}

function getDeleteTodoLink()
{
    const DELETE_TODO = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/";
    return DELETE_TODO;
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

const XUpdateTodo = (props) => {
    
    const [serverMessage, onServerMessageUpdate] = useState("");

    const [titleState, updateTitle] = useState(() => props.state.title);
    const [dateState , updateDate ] = useState(() => props.state.date );
    const [timeState , updateTime ] = useState(() => props.state.time );
    const [descState , updateDesc ] = useState(() => props.state.description);

    useEffect(() => {
        updateTitle(props.state.title);
        updateDate (props.state.date );
        updateTime (props.state.time );
        updateDesc (props.state.desc );
    }, [props.state]);

    const titleUpdate = (e) => updateTitle(e.target.value);
    const dateUpdate  = (e) => updateDate (e.target.value);
    const timeUpdate  = (e) => updateTime (e.target.value);
    const descUpdate  = (e) => updateDesc (e.target.value);

    /** on update todo */ 
    const onUpdateTodo = (e) => {
        console.log("called!");
        e.preventDefault();

        let title,
            date ,
            time ,
            descr;
        
        title = document.getElementById("updatetodo__title").value;
        date  = document.getElementById("updatetodo__date" ).value;
        time  = document.getElementById("updatetodo__time" ).value;
        descr = document.getElementById("updatetodo__description").value;

        fetch(getUpdateTodoLink() + props.state.todoid + "/update", {
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
            if (res_json.status === "ok")
            {   
                onServerMessageUpdate(res_json.message);
                return props.onSuccess?.call();
            }

            return onServerMessageUpdate(res_json.message);
        },
        (error) => console.log("Error transmitting data at " + getUpdateTodoLink()));
    }

    /** on delete todo is clicked */ 
    const onDeleteTodo = (e) => {
        fetch(getDeleteTodoLink() + props.state.todoid + "/delete", {
            method: "POST",
        })
        .then((res) => res.json())
        .then((res_json) => {
            if (res_json.status === "ok")
            return props.onSuccess?.call();
        }, 
        (error) => console.log("Error transmitting data at " + (getDeleteTodoLink() + props.state.todoid + "/delete")));
    }


    const closeModal = () => {
        onServerMessageUpdate("");
    }

    return (
        <div id={props.id} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content border-0 rounded-1 shadow-sm">
                    <div className="modal-header border-0">
                        <h5 className="modal-title">Update Todo</h5>
                        <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id={"updatetodo__" + props.id} action="#" method="GET" onSubmit={onUpdateTodo}>
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
                                            id="updatetodo__title" 
                                            iconClass="bi bi-vector-pen" 
                                            type="text" pattern="[\sA-Z]+" 
                                            placeholder="Todo title" 
                                            value={titleState} 
                                            onChange={titleUpdate} 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInputRaw 
                                            id="updatetodo__date" 
                                            iconClass="bi bi-calendar-fill" 
                                            type="date" 
                                            placeholder="Todo date" 
                                            value={dateState} 
                                            onChange={dateUpdate} 
                                            min={getDateToday()} 
                                            required/>
                                    </div>
                                    <div className="col-6 py-2">
                                        <XInputRaw 
                                            id="updatetodo__time" 
                                            iconClass="bi bi-clock-fill" 
                                            type="time" 
                                            placeholder="Todo time" 
                                            value={timeState} 
                                            onChange={timeUpdate} 
                                            required/>
                                    </div>
                                    <div className="col-12 py-2">
                                        <div className="input-group">
                                            <textarea id="updatetodo__description" className="form-control" cols="30" rows="4" placeholder="Description" onChange={descUpdate} value={descState} required></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12 py-2">
                                        <span className="d-inline-block w-100 rounded shadow-sm">
                                            <button className="btn btn-primary w-100" type="submit">
                                                UPDATE TODO
                                            </button>
                                        </span>
                                    </div>
                                    <div className="col-auto py-2">
                                        <button className="d-block mx-auto btn btn-primary border-0 bg-transparent" type="button" onClick={onDeleteTodo} data-bs-dismiss="modal" aria-label="close">
                                            <i className="bi bi-trash-fill text-muted"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer border-0">
                        <small className="small text-muted">Todo Updater</small>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default XUpdateTodo;