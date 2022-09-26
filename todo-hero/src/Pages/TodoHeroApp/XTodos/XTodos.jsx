/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React, { useEffect, useState } from "react";
import { XTodoList, XTLListItem } from "../../../Components/XTodoList/XTodoList";
import "./scss/xtodos.css";

import XInputRaw from "../../../Components/XInput/XInputRaw";
import LoginHandler from "../LogginHandler";

/*
 | API LINKS
 */ 


 function getTodoLink()
 {
     const TODO_LINK   = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/fetchTodos";
     return TODO_LINK;
 }
 

const XTodos = (props) => {

    const [todoFilter, onFilter] = useState("");
    const [todoList, onTodoUpdate] = useState({
        loaded: false,
        list  : []
    });

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

    const onSearch = (e) => onFilter(e.target.value);

    return (
        <section id="xtodos__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            {/* main view */}
            <div className="d-block p-0 px-sm-2 w-100 h-100">
                <div id="xtodos__todos-controls-wrapper" className="d-block px-3 px-sm-0 pt-5 pb-4 pt-sm-2 pb-sm-3">
                    <XInputRaw iconClass="bi bi-search" pattern="[a-zA-Z]+" placeholder="search" onChange={onSearch}/>
                </div>
                <div id="xtodos__todos-list-wrapper" className="d-block position-relative">
                    <XTodoList>
                    {(todoList.list.length > 0)?
                            /** atleast 1 on list */ 
                            todoList.list.filter((raw) => {
                                if (todoFilter.length <= 0)
                                return raw;

                                return raw.title.startsWith(todoFilter);
                            }).map((todo_raw) => {
                                return (
                                    <XTLListItem 
                                        todoid={todo_raw.todo_id} 
                                        key={todo_raw.user_todo_details_id}
                                        title={todo_raw.title} 
                                        description={todo_raw.description} 
                                        created_at={todo_raw.created_at}  
                                        date={todo_raw.date} 
                                        time={todo_raw.time}/>
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
                    </XTodoList>
                </div>
            </div>
        </section>
    );
}

export default XTodos;