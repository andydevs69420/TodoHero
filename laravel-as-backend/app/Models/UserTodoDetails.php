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


    /**
     * Get all todos by user id
     * @param int uid
     * @return Array[self|JSON]
     **/
    public static function getTodosByUserId(int $uid)
    {
        return self::join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
            ->where("user_todo_details.user_id_fk", "=", $uid)
            ->orderBy("todo.date", "asc")
            ->orderBy("todo.time", "desc")->get();
    }



    /**
     * Delete user todo
     * @param int userid
     * @param int todoid
     * @return bool
     **/
    public static function deleteUserTodoByID(int $userid, int $todoid)
    {
        return self::where("user_id_fk", "=", $userid)
            ->where("todo_id_fk", "=", $todoid)
            ->delete();
    }
}
