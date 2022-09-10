<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;


use App\Models\Admin;
use App\Models\User;
use App\Models\UserPlanDetails;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
    return view("welcome");
});


Route::get("/response", function () {
    return TodoHeroResponse::Bad("FOOOOOOC!!");
});


/*
 | LOGIN AREA
 |
 */
Route::get("/admin/login", function () {
    return view("admin.login");
});


Route::post("/admin/signup/attempt", function() {
    $x = request()->validate([
        "email" => "required|email|exists:admin",
    ]);

    $data = request()->except(["_token"]);
    error_log(json_encode($data));
    if (Auth::attempt($data))
        return redirect()->to("/admin/main");
    return back()->with("error", "Invalid userame or password!");
});

Route::get("/admin/logout", function() {
    if (Auth::check())
        Auth::logout();

    return redirect()->to("/admin/login");
})->middleware(["auth"]);



/*
 | SIGNUP AREA
 |
 */
Route::get("/admin/signup", function () {
    return view("admin.signup");
});


Route::post("/admin/signup/make", function() {
    $x = request()->validate([
        "email"    => "required|email|unique:user",
        "password" => "required|confirmed|min:8"
    ]);

    Admin::create([
        "email"    => request()->input("email"),
        "password" => Hash::make(request()->input("password")),
    ]);

    return redirect()->to("/admin/login");
});



Route::get("/admin/main", function() {

    $all = UserPlanDetails::getAllUser();

    return view("admin.main", ["all" => $all]);
})->middleware(["auth"]);


Route::get("/admin/user/delete/{userid}", function($userid) {

    User::where("user_id", "=", $userid)
        ->delete();

    return back();
})->middleware(["auth"])->where("userid", "[0-9]+");



Route::get("/admin/settings", function() {
    return view("admin.settings");
})->middleware(["auth"]);



Route::post("/admin/changepass", function() {
    request()->validate([
        "password" => "required|min:8|confirmed"
    ]);

    if (!Hash::check(request()->input("old_password"), Auth::user()->password))
        return back()->with("old_password", "incorrect password");

    User::where("user_id", "=", Auth::user()->id)
        ->delete([ "password" => Hash::make(request()->input("password")) ]);

    error_log("OK");
    return back();
})->middleware(["auth"]);
