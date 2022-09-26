<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $table = "plan";
    public $timestamps = false;
    protected $fillable  = ["plan_name", "plan_price", "number_of_todos"];
}
