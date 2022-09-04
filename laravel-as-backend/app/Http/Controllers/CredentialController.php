<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;

use Illuminate\Support\Facades\Hash;

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
        $selected_plan = $request->input("plan");

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
            "id"    => $user->id   ,
            "email" => $user->email,
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

        /** return email and userid */
        if (User::emailExist($email))
        {
            $user = User::getByEmail($email);
            return ([
                "id"    => $user->id   ,
                "email" => $user->email,
            ]);
        }

        /** first time login with google */
        /*
         | Use name as password
         */
        $user = User::initialSave($email, $name);
            /** update name */
            User::where("id", "=",$user->id)
                ->update([ "name" => $name ]);

        // only user id and email to
        // be returned!
        return json_encode([
            "id"    => $user->id   ,
            "email" => $user->email,
        ]);
    }
}
