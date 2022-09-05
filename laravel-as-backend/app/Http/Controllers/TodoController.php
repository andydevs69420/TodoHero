<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


use App\Models\Todo;
use App\Models\UserPlanDetails;


class TodoController extends Controller
{
    /**
     *
     **/
    public function insertTodo(Request $request, $id)
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
        error_log(json_encode($user));

        /** insert todo first */
        $todo = Todo::create([
            "title" => $title,
            "date"  => $date ,
            "time"  => $time ,
            "description" => $descr
        ]);


        return json_encode(["yes" => "I recieved", "id" => $id]);
    }


    public function update_OR_deleteTodo(Request $request)
    {
        error_log($request);
    }
}
