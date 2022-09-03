<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        // 'name',
        'email',
        // 'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * Check if email exists
     * @param string $email
     * @return Bool
     **/
    public static function emailExist(string $email)
    { return !(!self::where("email", "=", $email)->first()); }


    /**
     * Saves user email and password(hashed)
     * @param string $email
     * @param string $password
     * @return self
     **/
    public static function initialSave(string $email, string $raw_password)
    {
        $user = new User();
            $user->email = $email;
            $user->password = Hash::make($raw_password);
        $user->save();
        return $user;
    }

    public static function getByEmail(string $email)
    {
        return self::where("email", "=", $email)
            ->first();
    }
}
