<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $table = "todo";
    public $timestamps = true;
    protected $fillable  = ["title", "date", "time", "description"];
}
