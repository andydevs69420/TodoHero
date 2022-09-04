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


/*
 | Credential area
 | status: unstable
 */
Route::controller(CredentialController::class)->group(function(){
    Route::post("/signup"      , "signup"      );
    Route::post("/signin"      , "signin"      );
    Route::post("/signinGoogle", "signinGoogle");
});


/*
 | PlanList area
 | status: stable
 */
Route::controller(PlanController::class)->group(function() {
    Route::get("fetchPlanList", "fetchPlanList");
});


