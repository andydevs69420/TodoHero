<?php

namespace App\Helpers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\TodoHeroResponse;

use App\Models\Todo;
use App\Models\Plan;
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

        /** get current user first */
        $user = UserPlanDetails::getUserById($id);

        if (!$user)
        return TodoHeroResponse::Bad("User does not exist!");

        /** user exist */
        // -> check plan
        $number_of_todos = count(UserTodoDetails::where("user_id_fk", "=", $id)->get());

        $limiter = $user->number_of_todos;

        // unpaid account so apply "freemium" plan
        if ($user->plan_status_id_fk == 1)
        // limiter is freemium
        $limiter = Plan::where("plan_id", "=", 1)
            ->get()->first()->number_of_todos;

        if (($number_of_todos + 1) > $limiter)
        // exceeded plan offer
        return TodoHeroResponse::Bad("Maximum number of todo has been reached!");


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

        return TodoHeroResponse::Ok("Successfully added todo!");
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
        return TodoHeroResponse::Bad("Something went wrong while updating todo.");

        /** ok */
        return TodoHeroResponse::Ok("Successfully updated todo.");

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
        return TodoHeroResponse::Bad("Cannot delete todo(Something went wrong...)!");

        /** ok */
        return TodoHeroResponse::Ok("Successfully deleted!");
    }
}
