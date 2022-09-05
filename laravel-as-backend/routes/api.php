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
 | status: unstable
 */
Route::controller(TodoController::class)->group(function() {
    Route::post("/todo/{userid}/insert", "insertTodo")
        ->where("userid", "[1-9]+");
    Route::post("/todo/{userid}/{method}", "update_OR_deleteTodo")
        ->where("userid", "[1-9]+")
        ->whereIn("method", ["update", "delete"]);
});



/*
 | PlanList area
 | status: stable
 */
Route::controller(PlanController::class)->group(function() {
    Route::get("fetchPlanList", "fetchPlanList");
});


