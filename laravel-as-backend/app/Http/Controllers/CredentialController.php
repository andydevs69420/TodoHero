<?php
namespace App\Helpers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;


use App\Helpers\TodoHeroResponse;


use App\Models\User;
use App\Models\UserPlanDetails;
use App\Mail\SendVerificationEmail;


class CredentialController extends Controller
{
    /**
     * Handles signup
     * uses: POST method
     * @param Request $request
     * @return Array|JSON
     **/
    public function signup(Request $request)
    {
        $email         = $request->input("email");
        $password      = $request->input("password");
        $selected_plan = $request->input("choosenPlan");

        /** ensure email does not exist! */
        if (User::emailExist($request->input("email")))
        return TodoHeroResponse::Bad("This email is already used!");

        /** insert user first */
        $user = User::initialSave($email, $password);

        /** insert user and plan */
        $user_plan_details = UserPlanDetails::create([
            "user_id_fk" => $user->id     ,
            "plan_id_fk" => $selected_plan,

            // NOTE: 1 for unpaid. see plan_status table
            // if freemium, mark as paid
            "plan_status_id_fk" => ($selected_plan === 1)?2:1,
            "date_validated"    => Carbon::now("+8:00")
        ]);

        return TodoHeroResponse::Ok("Successfully signedup!");
    }




    /**
     * Handles signin
     * uses: POST method
     * @param Request $request
     * @return Array|JSON
     **/
    public function signin(Request $request)
    {
        $email    = $request->input("email");
        $password = $request->input("password");

        /** retrieve user by email */
        $user = User::getByEmail($email);

        /** check user existense */
        if (!$user)
        // user does not exist
        return TodoHeroResponse::Bad("User does not exist!");

        /** user exist | check password hash! */
        if (!Hash::check($password, $user->password))
        // invalid username or password
        return TodoHeroResponse::Bad("Incorrect password for this account!");

        /** user satisfied attempt! */

        // only user id and email will be returned!
        $data = TodoHeroResponse::Ok("User successful!", [
            "userdata" => ([
                "id"    => $user->user_id,
                "email" => $user->email  ,
            ])]
        );
        error_log($data);
        return $data;
    }


    /**
     * Handles google signin
     * uses: POST method
     * @param Request $request
     * @return Array|JSON
     **/
    public function signinGoogle(Request $request)
    {
        $email = $request->input("email");
        $name  = $request->input("name");
        $image = $request->input("image");

        /** return email and userid */
        if (User::emailExist($email))
        {
            $user = User::getByEmail($email);
            return ([
                "id"    => $user->user_id,
                "email" => $user->email  ,
            ]);
        }

        /** first time login with google */
        /*
         | Use name as password
         */
        $user = User::initialSave($email, $name);
            /** update name */
            User::where("user_id", "=",$user->id)
                ->update([ "name" => $name, "image" => $image ]);

        /** insert user and plan */
        $user_plan_details = UserPlanDetails::create([
            "user_id_fk" => $user->id,
            // TODO: 1 for freemium. see plan table
            "plan_id_fk" => 1,
            // TODO: 2 for unpaid. see plan_status table
            "plan_status_id_fk" => 2,
            "date_validated"    => Carbon::now("+8:00")
        ]);

        // only user id and email to
        // be returned!
        return json_encode([
            "id"    => $user->id   ,
            "email" => $user->email,
        ]);
    }
}
