<?php

namespace App\Helpers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

use App\Helpers\TodoHeroResponse;

use App\Models\UserPlanDetails;
use App\Models\User;

class AccountController extends Controller
{

    /**
     * Fetch account info
     * @param Request $request
     * @return Array|JSON
     **/
    public function get(Request $request, int $userid)
    {
        $user = UserPlanDetails::getUserById($userid);

        if (!$user)
        return TodoHeroResponse::Bad("User does not exist!");

        return TodoHeroResponse::Ok("User succesfully fetched!", [ "usrdata" => $user ]);
    }


    /**
     * Handles accunt update
     * @param Request $request
     * @param int userid
     * @return Array|JSON
     **/
    public function update(Request $request, int $userid, string $column)
    {
        switch($column)
        {
            case "image":
                return $this->updateImage($request, $userid);
            case "name":
                return $this->updateName($request, $userid);
            case "password":
                return $this->updatePassword($request, $userid);
            case "plan":
                return $this->updatePlan($request, $userid);
        }
    }


    /**
     * Update image column
     * @param Request $request
     * @return Array|JSON
     **/
    private function updateImage(Request $request, int $userid)
    {
        $file  = $request->file("file");
        $fname = "user__" . (string) $userid . "_" . $file->getClientOriginalName();

        $path = Storage::disk("public")->putFileAs(
            "avatar",
            $file   ,
            $fname  ,
        );

        if (!$path)
        return TodoHeroResponse::Bad("Could not save image(Something went wrong...)!");

        /** realpath */
        $rpath = $request->input("host") . Storage::url($path);

        $update = User::where("user_id", "=", $userid)
            ->update([ "image" => $rpath ]);

        if (!$update)
        return TodoHeroResponse::Bad("Could not update record(Something went wrong...)!");

        /** ok */
        return TodoHeroResponse::Ok("Successfully saved profile image!");
    }



    /**
     * Update name column
     * @param Request $request
     * @return Array|JSON
     **/
    private function updateName(Request $request, int $userid)
    {
        $update = User::where("user_id", "=", $userid)
            ->update(["name" => $request->input("name")]);

        if (!$update)
        return TodoHeroResponse::Bad("Something went wrong while updating account!");

        /** ok */
        return TodoHeroResponse::Ok("Succssfully updated account!");
    }


    /**
     * Update password column
     * @param Request $request
     * @param int $userid
     * @return Array|JSON
     **/
    private function updatePassword(Request $request, int $userid)
    {
        $user = User::where("user_id", "=", $userid)
            ->get()->first();

        if (!$user)
        return TodoHeroResponse::Bad("User does not exist!");

        /** user not exist */
        if (!Hash::check($request->input("password"), $user->password))
        return TodoHeroResponse::Bad("Password does not match!");

        /** update */
        $update = User::where("user_id", "=", $userid)
            ->update([ "password" => Hash::make($request->input("newpass")) ]);

        if (!$update)
        return TodoHeroResponse::Bad("Something went wrong while updating password!");

        /** ok */
        return TodoHeroResponse::Ok("Succssfully updated account!");
    }



    /**
     * Update plan information
     * @param Request $request
     * @param int $userid
     * @return Array|JSON
     **/
    private function updatePlan(Request $request, int $userid)
    {
        $updated = UserPlanDetails::where("user_id_fk", "=", $userid)
            ->update([
                "plan_id_fk"        => $request->input("plan_id"),
                "plan_status_id_fk" => 2
            ]);

        if (!$updated)
        return TodoHeroResponse::Bad("Something went wrong from the server!");

        /** ok */
        return TodoHeroResponse::Ok("recieves plan update!");
    }
}
