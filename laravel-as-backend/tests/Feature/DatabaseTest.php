<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use Illuminate\Support\Facades\DB;
use App\Models\UserTodoDetails;

class DatabaseTest extends TestCase
{
    /**
     * Test for users which plan is expired or due!
     * @return void
     **/
    public function test_send_email_to_user()
    {
        $users = DB::table("user_todo_details")
        ->join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
        ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
        ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
        ->whereDay("todo.date", "<=", DB::Raw("DAY(CURRENT_DATE)"))
        ->whereTime("todo.time", "<", DB::Raw("TIME(CURRENT_TIME)"))
        ->get();

        echo json_encode($users);
        $this->assertNotEmpty($users);
    }

    public function test_update_expired_user_plan()
    {
        $res = Db::unprepared("
            UPDATE user_plan_details SET user_plan_details.plan_status_id_fk = 1
            WHERE (month(user_plan_details.date_validated) < month(CURRENT_DATE)) and
                ( year(user_plan_details.date_validated) = year (CURRENT_DATE)) and
                (user_plan_details.plan_status_id_fk = 2 and user_plan_details.plan_id_fk != 1);
        ");

        $this->assertEquals($res, 1);
    }
}
