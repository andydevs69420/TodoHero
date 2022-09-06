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

/*
 | API LINKS
 */ 
const TODO_LINK   = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/fetchTodos";
const DELETE_TODO = process.env.REACT_APP_API_HOST + "/todo/" + LoginHandler.getLoginCred().id + "/";




const XManage = (props) => {

    const [todoList, onTodoUpdate] = useState([]);

    const fetchTodos = () => {

        fetch(TODO_LINK)
        .then((res) => res.json())
        .then((res_json) => {
            onTodoUpdate(res_json);
        }, 
        (error) => console.log("Error transmitting data at " + TODO_LINK));

    };

    /** get all todos */ 
    useEffect(() => fetchTodos(), []);

    /** on todo insnerted | fetch data again */ 
    const onNewTodoInserted = () => fetchTodos();

    /** on delete todo is clicked */ 
    const deleteTodo = (todo_id) => {
        fetch(DELETE_TODO + todo_id + "/delete", {
            method: "POST",
        })
        .then((res) => res.json())
        .then((res_json) => {
            console.log(res_json);
        }, 
        (error) => console.log("Error transmitting data at " + (DELETE_TODO + todo_id + "/delete"), error));
    }


    return (
        <section id="xmanage__main" className="d-block position-relative p-0 p-sm-2 w-100 h-100">
            
            {/* new todo modal */}
            <XNewTodo id="xmanage__new-todo-modal" onSuccess={onNewTodoInserted} />

            {/* main view */}
            <div className="d-block p-0 px-sm-2 w-100 h-100">
                <div id="xmanage__manage-controls-wrapper" className="d-block px-3 px-sm-0 pt-5 pb-4 pt-sm-2 pb-sm-3">
                    <XInputRaw iconClass="bi bi-search" pattern="[a-zA-Z]+" placeholder="search"/>
                </div>
                <div id="xmanage__manage-list-wrapper" className="d-block position-relative">
                    <XManageList>
                        {todoList.map((todo_raw) => {

                            return (
                                <XMLListItem 
                                    id={todo_raw.todo_id} 
                                    key={todo_raw.user_todo_details_id}
                                    title={todo_raw.title} 
                                    descrption={todo_raw.description} 
                                    date={todo_raw.date}
                                    time={todo_raw.time}
                                    onDelete={deleteTodo}/>
                            );

                        })}
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