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


    public function update_OR_deleteTodo(Request $request, int $userid, int $todoid, string $method)
    {
        switch($method)
        {
            case "update":
                return $this->update($request, $userid, $todoid);
            case "delete":
                return $this->delete($userid, $todoid);
        }
    }

    /**
     * Updates todo value
     * @param Request $request
     * @param int $userid
     * @param int $todoid
     * @return Array|JSON
     **/
    private function update(Request $request, int $userid, int $todoid)
    {
        $updatev = Todo::where("todo_id", "=", $todoid)
            ->update([
                "title" => $request->input("title"),
                "date"  => $request->input("date" ),
                "time"  => $request->input("time" ),
                "description" => $request->input("descr"),
            ]);

        if (!$updatev)
        return json_encode([
            "status"  => "bad",
            "message" => "Something went wrong while updating todo."
        ]);

        return json_encode([
            "status"  => "ok",
            "message" => "Successfully updated todo."
        ]);
    }


    /**
     * Removes todo from list
     * @param int $userid
     * @param int $todoid
     * @return Array|JSON
     **/
    private function delete(int $userid, int $todoid)
    {
        $del_flag = UserTodoDetails::deleteUserTodoByID($userid, $todoid);
        if (!$del_flag)
            return json_encode([
                "status"  => "bad",
                "message" => "Cannot delete todo(Something went wrong...)!"
            ]);

        return json_encode([
            "status"  => "ok",
            "message" => "Successfully deleted!"
        ]);
    }
}
