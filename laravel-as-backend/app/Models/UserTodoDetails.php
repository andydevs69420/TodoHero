<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class UserTodoDetails extends Model
{
    use HasFactory;
    protected $table = "user_todo_details";
    public $timestamps = false;
    protected $fillable  = ["user_id_fk", "todo_id_fk"];



    public static function getTodosByUserId(int $uid)
    {
        return DB::table("user_todo_details")
            ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
            ->where("user_todo_details.user_id_fk", "=", $uid)
            ->orderBy("todo.date", "asc")
            ->orderBy("todo.time", "asc")->get();
    }

}
