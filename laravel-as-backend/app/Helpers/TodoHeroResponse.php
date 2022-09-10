<?php

namespace App\Helpers;

class TodoHeroResponse
{
    private static function response(string $status, string $message)
    {
        return ([
            "status"  => $status,
            "message" => $message
        ]);
    }

    public static function Ok(string $message, Array $data=[])
    {
        $res = self::response("ok", $message);
        $res = array_merge($res, $data);

        return json_encode($res);
    }

    public static function Bad(string $message, Array $data=[])
    {
        $res = self::response("bad", $message);
        $res = array_merge($res, $data);

        return json_encode($res);
    }
}
