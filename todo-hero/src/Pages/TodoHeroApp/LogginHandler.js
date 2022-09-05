/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


class LoginHandler
{
    static isLoggedin()
    {
        let credObj;
        
        try 
        { credObj = JSON.parse(localStorage.getItem("todoherouser")); }
        catch(err)
        { return false; }

        if (!credObj)
        return false;

        return !(!(credObj.id && credObj.email));
    }

    static getLoginCred()
    {
        if (!LoginHandler.isLoggedin())
            return ({});
        
        return JSON.parse(localStorage.getItem("todoherouser"));
    }
}


export default LoginHandler;