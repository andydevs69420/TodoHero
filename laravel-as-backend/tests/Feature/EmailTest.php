<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use App\Models\User;
use App\Models\UserTodoDetails;
use App\Mail\SendEmail;


class EmailTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_send_email_to_users()
    {
        $users = DB::table("user_todo_details")
        ->join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
        ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
        ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
        ->whereDay("todo.date", "<=", DB::Raw("DAY(CURRENT_DATE)"))
        ->whereTime("todo.time", "<", DB::Raw("TIME(CURRENT_TIME)"))
        ->get();

        foreach($users as $user_todo)
        {
            $status = Mail::to(
                User::where("user_id", "=", $user_todo->user_id)->get()->first()
            )->send(new SendEmail($user_todo));
            error_log("sent!!!");

            // UserTodoDetails::where(
            //     "user_todo_details_id",
            //     "=",
            //     $user_todo->user_todo_details_id
            // )
            // ->delete();
        }

        $this->assertTrue(true);
    }
}
