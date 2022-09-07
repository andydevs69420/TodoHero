<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserPlanDetails;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Carbon;

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
        $email = $request->input("email");
        $password = $request->input("password");
        $selected_plan = $request->input("choosenPlan");

        $response = ([
            "status"  => "",
            "message" => "",
        ]);

        /** ensure email does not exist! */
        if (User::emailExist($request->input("email")))
        {
            $response["status" ] = "bad";
            $response["message"] = "This email is already used!";
            return json_encode($response);
        }

        /** insert user first */
        $user = User::initialSave($email, $password);

        /** insert user and plan */
        $user_plan_details = UserPlanDetails::create([
            "user_id_fk" => $user->id     ,
            "plan_id_fk" => $selected_plan,

            // TODO: 1 for unpaid. see plan_status table
            "plan_status_id_fk" => 1,
            "date_validated"    => Carbon::now("+8:00")
        ]);

        $response["status" ] = "ok";
        $response["message"] = "Successfully signedup!";
        return json_encode($response);
    }




    /**
     * Handles signin
     * uses: POST method
     * @param Request $request
     * @return Array|JSON
     **/
    public function signin(Request $request)
    {
        $email = $request->input("email");
        $password = $request->input("password");

        $response = ([
            "status" => "",
            "email"  => "",
            "passw"  => "",
        ]);

        /** retrieve user by email */
        $user = User::getByEmail($email);
        error_log($user);

        if (!$user)
        {   // user does not exist
            $response["status"] = "bad";
            $response["email" ] = "User does not exist!";
            return json_encode($response);
        }

        if (!$user->verified_at)
        {   // user does is not verified
            $response["status"] = "bad";
            $response["email" ] = "User is not yet verified!";
            return json_encode($response);
        }

        /** user exist | check password hash! */
        if (!Hash::check($password, $user->password))
        {   // invalid username or password
            $response["status"] = "bad";
            $response["passw" ] = "Incorrect password for this account!";
            return json_encode($response);
        }

        /** user satisfied attempt! */
        $response["status" ] = "ok";
        $response["message"] = "User successful!";
        // only user id and email to
        // be returned!
        $response["userdata"] = ([
            "id"    => $user->user_id,
            "email" => $user->email  ,
        ]);
        return json_encode($response);
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
