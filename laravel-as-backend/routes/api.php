<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware("auth:sanctum")->get("/user", function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\PlanController;
use App\Http\Controllers\CredentialController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AccountController;


/*
 | Credential area
 | status: stable
 */
Route::controller(CredentialController::class)->group(function() {
    Route::post("/signup"      , "signup"      );
    Route::post("/signin"      , "signin"      );
    Route::post("/signinGoogle", "signinGoogle");
});


/*
 | Todo CRUD area
 | status: stable
 */
Route::controller(TodoController::class)->group(function() {
    Route::get ("/todo/{userid}/fetchTodos", "fetchTodos")
        ->where("userid", "[0-9]+");

    Route::post("/todo/{userid}/insert", "insertTodo")
        ->where("userid", "[0-9]+");
    Route::post("/todo/{userid}/{todoid}/{method}", "update_OR_deleteTodo")
        ->where("userid", "[0-9]+")
        ->where("todoid", "[0-9]+")
        ->whereIn("method", ["update", "delete"]);
});


/*
 | Account ctontroll area
 | status: stable
 */
Route::controller(AccountController::class)->group(function() {
    Route::post("/account/{userid}/get", "get")
        ->where("userid", "[0-9]+");

    Route::post("/account/{userid}/update/{column}", "update")
        ->where("userid", "[0-9]+")
        ->whereIn("column", ["image", "name", "password", "plan"]);
});


/*
 | PlanList area
 | status: stable
 */
Route::controller(PlanController::class)->group(function() {
    Route::get("fetchPlanList", "fetchPlanList");
});


