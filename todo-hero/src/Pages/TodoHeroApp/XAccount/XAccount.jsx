/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, { useEffect, useState } from "react";
import "./scss/xaccount.css";

/*
 | IMAGE ASSETS
 */ 
import CARD_BG from "../../../Assets/Images/card-image.jpg";
import AVATAR  from "../../../Assets/Images/avatar-placeholder.png";

/*
 | OTHER COMPONENTS
 */
import XInput      from "../../../Components/XInput/XInput";
import XAvatar     from "../../../Components/XAvatar/XAvatar";
import XButtonFlat from "../../../Components/XButton/XButtonFlat";



import LoginHandler from "../LogginHandler";

function getAccountLink()
{
    const USER_LINK = process.env.REACT_APP_API_HOST + "/account/" + LoginHandler.getLoginCred().id;
    return USER_LINK;
}

const XAccount = (props) => {

    const [userInfo, updateUserInfo] = useState({});
    const [serverMessage, updateServerMesage] = useState("");
    const [confPassword, updateConfPasswordState] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = () => {
        fetch(getAccountLink() + "/get", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        })
        .then((res) => res.json())
        .then((res_json) => {
            if (res_json.status === "ok")
            return updateUserInfo(res_json.usrdata);
        },
        (error) => console.log("Error transmitting data at " + getAccountLink() + "/get"));
    }

    const onNameUpdate = (e) => {
        e.preventDefault();

        let name;

        name = document.getElementById("xaccount__name").value;

        fetch(getAccountLink() + "/update/name", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name: name
            })
        })
        .then((res) => res.json())
        .then((res_json) => {
            if (res_json.status === "ok")
            return fetchUser();
        },
        (error) => console.log("Error transmitting data at " + (getAccountLink() + "/update/name")));
    }

    const onPasswordUpdate = (e) => {
        e.preventDefault();

        let password,
            newpass ,
            conpass ;
        
        password = document.getElementById("xaccount__current-password").value;
        newpass  = document.getElementById("xaccount__new-password"    ).value;
        conpass  = document.getElementById("xaccount__confirm-password").value;

        if (password.length <= 0)
        return;

        if (newpass !== conpass)
        return;

        fetch(getAccountLink() + "/update/password", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                password : password,
                newpass  : newpass
            })
        })
        .then((res) => res.json())
        .then((res_json) => {
            if (res_json.status === "ok")
            return cleanup();

            /** update if has problem */ 
            return updateServerMesage(res_json.message);
        },
        (error) => console.log("Error transmitting data at " + (getAccountLink() + "/update/password")));
    }


    const onConfPassUpdate = (e) => {
        let passw = document.getElementById("xaccount__new-password"    ).value;
        let cpass = document.getElementById("xaccount__confirm-password").value;

        if (passw.length <= 0)
        return updateConfPasswordState("");

        if (passw !== cpass)
            updateConfPasswordState("password does not match!");
        else
            updateConfPasswordState("");
    }

    const onNewDP = (e) => {

        if (e.target.files.length <= 0)
        return;

        let formD = new FormData();
            formD.append("file", e.target.files[0]);
            formD.append("host", process.env.REACT_APP_HOST);
        
        fetch(getAccountLink() + "/update/image", {
            method: "POST",
            body: formD
        })
        .then((res) => res.json())
        .then((res_json) => {
            if (res_json.status === "ok")
            return fetchUser();
        }, 
        (error) => console.log("Error transmitting data at " + (getAccountLink() + "/update/image")));
    }

    const cleanup = () => {
        document.getElementById("xaccount__current-password").value = "";
        document.getElementById("xaccount__new-password"    ).value = "";
        document.getElementById("xaccount__confirm-password").value = "";
    }

    return (
        <section id="xaccount__main" className="d-block position-relative p-0 p-sm-3 w-100 h-100">
            <div className="container p-4 bg-light shadow-sm">
                <div className="row">
                    {/* col A */}
                    <div className="col-12 col-xl-6">
                        <div className="container-fluid">
                            <div className="row">
                                {/* names */}
                                <div className="col-12 mt-3 mb-1">
                                    <h2 className="h2 lead text-muted">USERNAME</h2>
                                </div>
                                <div className="col-12 my-2">
                                    <form action="#" method="GET" onSubmit={onNameUpdate}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12 px-0">
                                                    <div className="d-block mb-1">
                                                        <label className="small" htmlFor="name">fullname</label>
                                                        <XInput 
                                                            id="xaccount__name" 
                                                            iconClass="bi bi-person-fill" 
                                                            bgTheme="bg-primary" 
                                                            fgTheme="text-white" 
                                                            type="text" 
                                                            placeholder="username" 
                                                            value={userInfo.name}/>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4 col-md-3 offset-0 offset-sm-8 offset-md-9 px-0">
                                                    <div className="d-block mt-3">
                                                        <XButtonFlat className="btn-sm">UPDATE</XButtonFlat>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {/* password */}
                                <div className="col-12 mt-3 mb-1">
                                    <h2 className="h2 lead text-muted">PASSWORD</h2>
                                </div>
                                <div className="col-12 my-2 mb-1">
                                        {(serverMessage.length > 0) && 
                                            <div className="alert alert-dismissible alert-danger show" role="alert">
                                                <strong>{serverMessage}</strong>
                                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                            </div>
                                        }
                                </div>
                                <div className="col-12 my-2">
                                    <form action="#" method="GET" onSubmit={onPasswordUpdate}>
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-12 px-0">
                                                    <div className="d-block mb-1">
                                                        <label className="small" htmlFor="name">current password</label>
                                                        <XInput 
                                                            id="xaccount__current-password" 
                                                            iconClass="bi bi-lock-fill" 
                                                            bgTheme="bg-primary" 
                                                            fgTheme="text-white" 
                                                            placeholder="current password" 
                                                            type="password"/>
                                                    </div>
                                                </div>
                                                <div className="col-12 px-0">
                                                    <div className="d-block mt-1">
                                                        <label className="small" htmlFor="email">new password</label>
                                                        <XInput 
                                                            id="xaccount__new-password"
                                                            iconClass="bi bi-shield-lock-fill" 
                                                            bgTheme="bg-primary" 
                                                            fgTheme="text-white" 
                                                            placeholder="new password"
                                                            type="password" 
                                                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                                                    </div>
                                                </div>
                                                <div className="col-12 px-0">
                                                    <div className="d-block mt-1">
                                                        <label className="small" htmlFor="email">confirm password</label>
                                                        <XInput 
                                                            id="xaccount__confirm-password" 
                                                            iconClass="bi bi-check-circle-fill" 
                                                            bgTheme="bg-primary" 
                                                            fgTheme="text-white" 
                                                            placeholder="confirm password" 
                                                            type="password" 
                                                            onChange={onConfPassUpdate}
                                                            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/>
                                                        <small className="small text-danger">{confPassword}</small>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4 col-md-3 offset-0 offset-sm-8 offset-md-9 px-0">
                                                    <div className="d-block mt-3">
                                                        <XButtonFlat className="btn-sm">UPDATE</XButtonFlat>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* col B */}
                    <div className="col-12 col-xl-6 order-first order-xl-last">
                        <div className="container-fluid">
                            <div className="row">
                               {/* profile */}
                                <div className="col-12 mt-3 mt-1">
                                    <div className="card border-0 shadow-sm">
                                        <img className="card-img-top" src={CARD_BG} alt="card-img"/>
                                        <div className="card-body placeholder-glow">

                                            <XAvatar id="xaccount__avatar" src={userInfo.image?userInfo.image:AVATAR} size="40%"/>

                                            <h4 className={
                                                "card-title" + 
                                                ((userInfo.name)?"":" placeholder")
                                            }>
                                                {(userInfo.name)?userInfo.name:"???????????????????????????"}
                                            </h4>
                                            <p className="card-text placeholder-glow">
                                                <span className={((userInfo.plan_name)?"":" placeholder")}>
                                                    {(userInfo.plan_name)?
                                                        (
                                                            <span className="d-inline text-muted">
                                                                <i className="bi bi-ticket-fill text-warning"></i> {userInfo.plan_name}
                                                            </span>
                                                        )
                                                        :
                                                        "??????????????????"
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                        <div className="card-footer text-end border-0 bg-transparent">
                                            <input id="xaccount__image-pick" className="d-none form-control" type="file" accept=".png" onChange={onNewDP}/>
                                            <label className="btn btn-primary border-0 bg-transparent" htmlFor="xaccount__image-pick" role="button">
                                                <i className="bi bi-camera-fill text-muted"></i>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default XAccount;