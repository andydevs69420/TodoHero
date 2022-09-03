<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Registered;


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

        $message_result = ([
            "status"   => "",
            "email"    => "",
            "password" => "",
        ]);

        /** ensure email does not exist! */
        if (User::emailExist($request->input("email")))
        {
            $message_result["status"] = "bad";
            $message_result["email"]  = "This email is alread used!";
            return json_encode($message_result);
        }

        /** insert user first */
        $user = User::initialSave($email, $password);

        $message_result["status"] = "ok";
        $message_result["email" ] = "Successfully signedup!";
        return json_encode($message_result);
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

        /** retrieve user by email */
        $user = User::getByEmail($email);

        error_log($user);
    }
}
