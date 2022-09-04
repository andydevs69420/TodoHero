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
     * @return View
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
            $response["message"] = "This email is alread used!";
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
     * @return View
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
            $request["status"] = "bad";
            $request["email" ] = "User \"$email\" does not exist!";
            return json_encode($response);
        }

        /** user exist | check password hash! */
        if (!Hash::check($password, $user->password))
        {   // invalid username or password
            $request["status"] = "bad";
            $request["passw" ] = "Incorrect password for this account!";
            return json_encode($response);
        }

        /** user satisfied attempt! */
        $request["status" ] = "ok";
        $request["message"] = "User successful!";
        // only user id and email to
        // be returned!
        $request["userdata"] = ([
            "id"    => $user->id,
            "email" => $user->email,
        ]);
        return json_encode($response);
    }
}
