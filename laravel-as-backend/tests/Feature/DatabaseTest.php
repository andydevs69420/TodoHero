<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

use Illuminate\Support\Facades\DB;
use App\Models\UserPlanDetails;
use App\Models\UserTodoDetails;

class DatabaseTest extends TestCase
{
    /**
     * Test for users which plan is expired or due!
     * @return void
     **/
    public function test_send_email_to_user()
    {
        $users = UserTodoDetails::join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
            ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
            ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
            ->whereDay("todo.date"  , "<=", DB::Raw("DAY(CURRENT_DATE)"))
            ->whereTime("todo.time" , "<" , DB::Raw("TIME(CURRENT_TIME)"))
            ->get();

        $this->assertTrue(true);
    }

    public function test_update_expired_user_plan()
    {
        $res = UserPlanDetails::whereMonth("user_plan_details.date_validated", "<", DB::Raw("MONTH(CURRENT_DATE)"))
            ->whereYear("user_plan_details.date_validated", "=", DB::Raw("YEAR(CURRENT_DATE)"))
            ->where("user_plan_details.plan_status_id_fk", "=", "2")
            ->where("user_plan_details.plan_id_fk", "!=", "1")
            ->update([ "plan_status_id_fk" => 1 ]);

        $this->assertTrue(true);
    }


    /** TO SQL RAW TESTS */
    public function test_send_email_to_sql()
    {
        $users = UserTodoDetails::join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
            ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
            ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
            ->whereDay("todo.date"  , "<=", DB::Raw("DAY(CURRENT_DATE)"))
            ->whereTime("todo.time" , "<" , DB::Raw("TIME(CURRENT_TIME)"))
            // ->get();
            ->toSql();

        error_log($users);

        $this->assertTrue(!(!$users));
    }

    public function test_update_expired_to_sql()
    {
        $res = UserPlanDetails::whereMonth("user_plan_details.date_validated", "<", DB::Raw("MONTH(CURRENT_DATE)"))
            ->whereYear("user_plan_details.date_validated", "=", DB::Raw("YEAR(CURRENT_DATE)"))
            ->where("user_plan_details.plan_status_id_fk", "=", "2")
            ->where("user_plan_details.plan_id_fk", "!=", "1")
            // ->update([ "plan_status_id_fk" => 1 ]);
            ->toSql();

        error_log($res);

        $this->assertTrue(true);
    }
}
