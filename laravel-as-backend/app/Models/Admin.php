<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Database\Eloquent\Model;



class Admin extends Authenticatable
{
    use HasFactory;

    protected $table = "admin";
    public $timestamps = true;
    protected $fillable  = ["email", "password"];
}
