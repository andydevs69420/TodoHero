<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Todo;
use App\Models\UserPlanDetails;
use App\Models\UserTodoDetails;


class TodoController extends Controller
{
    /**
     * Handles todo list
     * uses: GET method
     * @param Request $request
     * @param int $id
     * @return Array|JSON
     **/
    public function fetchTodos(Request $request, int $id)
    {
        $todos = UserTodoDetails::getTodosByUserId($id);
        return json_encode($todos);
    }


    /**
     * Handles todo insertion
     * uses: POST method
     * @param Request $request
     * @param int $id
     * @return Array|JSON
     **/
    public function insertTodo(Request $request, int $id)
    {
        $title = $request->input("title");
        $date  = $request->input("date");
        $time  = $request->input("time");
        $descr = $request->input("descr");

        $response = ([
            "status"  => "",
            "message" => "",
        ]);

        /** get current user first */
        $user = UserPlanDetails::getUserById($id);

        if (!$user)
        {
            $response["status" ] = "bad";
            $response["message"] = "User does not exist!";
            return json_encode($response);
        }

        /** user exist */

        // -> check plan
        $number_of_todos = count(UserTodoDetails::where("user_id_fk", "=", $id)->get());

        if (($number_of_todos + 1) > $user->number_of_todos)
        {   // exceeded plan offer
            $response["status" ] = "bad";
            $response["message"] = "Maximum number of todo has been reached!";
            return json_encode($response);
        }

        /** insert todo first */
        $todo = Todo::create([
            "title" => $title,
            "date"  => $date ,
            "time"  => $time ,
            "description" => $descr
        ]);

        /** insert user todo */
        $user_todo_details = UserTodoDetails::create([
            "user_id_fk" => $id      ,
            "todo_id_fk" => $todo->id,
        ]);

        $response["status" ] = "ok";
        $response["message"] = "Successfully added todo!";
        return json_encode($response);
    }


    public function update_OR_deleteTodo(Request $request)
    {
        error_log($request);
    }
}
