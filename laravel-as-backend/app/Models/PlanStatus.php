<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanStatus extends Model
{
    use HasFactory;

    protected $table = "plan_status";
    public $timestamps = false;
    protected $fillable  = ["plan_status_name"];
}
