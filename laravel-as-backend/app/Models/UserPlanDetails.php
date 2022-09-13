<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class UserPlanDetails extends Model
{
    use HasFactory;
    protected $table = "user_plan_details";
    public $timestamps = false;
    protected $fillable  = ["user_id_fk", "plan_id_fk", "plan_status_id_fk", "date_validated"];



    public static function getUserById(int $uid)
    {
        return self::join("user", "user_plan_details.user_id_fk", "=", "user.user_id")
            ->join("plan", "user_plan_details.plan_id_fk", "=", "plan.plan_id")
            ->join("plan_status", "user_plan_details.plan_status_id_fk", "=", "plan_status.plan_status_id")
            ->where("user.user_id", "=", $uid)->first();
    }

    public static function getAllUser()
    {
        return self::join("user", "user_plan_details.user_id_fk", "=", "user.user_id")
            ->join("plan", "user_plan_details.plan_id_fk", "=", "plan.plan_id")
            ->join("plan_status", "user_plan_details.plan_status_id_fk", "=", "plan_status.plan_status_id")
            ->get();
    }
}
