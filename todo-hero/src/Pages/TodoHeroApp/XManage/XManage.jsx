/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */



import React, { useEffect, useState } from "react";
import { XManageList, XMLListItem } from "../../../Components/XManageList/XManageList";
import "./scss/xmanage.css";


/*
 | OTHER COMPONENTS
 */ 
import XInputRaw from "../../../Components/XInput/XInputRaw";
import XFab      from "../../../Components/XFab/XFab";
import XNewTodo  from "./XNewTodo";


import LoginHandler from "../LogginHandler";
import XUpdateTodo from "./XUpdateTodo";

/*
 | API LINKS
 */ 


function getTodoLink()
{
    const TODO_LINK   = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/fetchTodos";
    return TODO_LINK;
}




const XManage = (props) => {

    const [todoFilter, onFilter] = useState("");
    const [todoList, onTodoUpdate] = useState({
        loaded: false,
        list  : []
    });
    const [updateCandidate, onCandidateUpdate] = useState({
        todoid : "",
        title  : "",
        date   : "",
        time   : "",
        desc   : "",
    });
    
    const onSearch = (e) => onFilter(e.target.value);

    const onTileClick = (todoid, title, description, date, time) => {
        onCandidateUpdate((old) => ({
            ...old,
            todoid : todoid, 
            title  : title , 
            date   : date  , 
            time   : time  , 
            desc   : description,
       }));
    }

    const fetchTodos = () => {

        fetch(getTodoLink())
        .then((res) => res.json())
        .then((res_json) => {
            onTodoUpdate((old) => ({
                ...old,
                loaded: true,
                list  : res_json
            }));
        }, 
        (error) => console.log("Error transmitting data at " + getTodoLink()));

    };

    /** get all todos */ 
    useEffect(() => fetchTodos(), []);


    /** on todo insnerted | fetch data again */ 
    const onOperation = () => fetchTodos();

    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            
            {/* new todo modal */}
            <XNewTodo id="xmanage__new-todo-modal" onSuccess={onOperation} />

            {/* update todo modal */}
            <XUpdateTodo id="xmanage__update-todo-modal" 
                state={updateCandidate}
                onSuccess={onOperation}/>

            {/* main view */}
            <div className="d-block p-0 px-sm-2 w-100 h-100">
                <div id="xmanage__manage-controls-wrapper" className="d-block px-3 px-sm-0 pt-5 pb-4 pt-sm-2 pb-sm-3">
                    <XInputRaw iconClass="bi bi-search" pattern="[a-zA-Z]+" placeholder="search" onChange={onSearch}/>
                </div>
                <div id="xmanage__manage-list-wrapper" className="d-block position-relative">
                    <XManageList>
                        {(todoList.list.length > 0)?
                            /** atleast 1 on list */ 
                            todoList.list.filter((raw) => {
                                if (todoFilter.length <= 0)
                                return raw;

                                return raw.title.startsWith(todoFilter);
                            }).map((todo_raw) => {
                                return (
                                    <XMLListItem 
                                        todoid={todo_raw.todo_id} 
                                        key={todo_raw.user_todo_details_id}
                                        title={todo_raw.title} 
                                        description={todo_raw.description} 
                                        date={todo_raw.date}
                                        time={todo_raw.time}
                                        onClick={onTileClick} 
                                        dataBsToggle="modal" 
                                        dataBsTarget="#xmanage__update-todo-modal"/>
                                );
    
                            }):
                            (todoList.loaded && todoList.list.length <= 0)?
                            /** no attempt of inserting */ 
                            (<div className="d-block mx-auto my-5 text-center opacity-50">
                                <span className="bi bi-x-square-fill fs-1 text-muted"></span>
                                <h1 className="display-5 lead text-muted">Empty todo list</h1>
                            </div>)
                            :
                            /** on empty list */ 
                            (<div className="mx-auto my-5">
                                <div className="card border-0 shadow-sm">
                                  <div className="card-body">
                                        <div className="d-block mx-auto spinner-border text-primary" role="status">
                                            <span className="visually-hidden"></span>
                                        </div>
                                        <h5 className="mt-4 text-center lead text-muted">Loading Todos...</h5>
                                  </div>
                                </div>
                            </div>)
                        }
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