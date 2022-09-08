<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

use App\Models\User;
use App\Models\UserTodoDetails;
use App\Mail\SendEmail;

class NotifyUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "notify:user";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Command description";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
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
            Mail::to(
                User::where("user_id", "=", $user_todo->user_id)->get()->first()
            )->send(new SendEmail($user_todo));

            UserTodoDetails::where(
                "user_todo_details_id",
                "=",
                $user_todo->user_todo_details_id
            )
            ->delete();
        }
        return 0;
    }
}
