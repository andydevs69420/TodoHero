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
            "status"  => "",
            "message" => "",
        ]);

        /** retrieve user by email */
        $user = User::getByEmail($email);

        if (!$user)
        {   // user not exist

            return;
        }

        error_log($user);
    }
}
