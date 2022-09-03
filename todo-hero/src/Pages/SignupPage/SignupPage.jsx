/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */


import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./scss/signup.css";


/*
 | OTHER COMPONENTS
 */ 

import XLoading from "../../Components/XLoading/XLoading";
import XInput   from "../../Components/XInput/XInput";
import XButton  from "../../Components/XButton/XButton";
import XSelect  from "../../Components/XSelect/XSelect";
import XRoundLink from "../../Components/XRoundLink/XRoundLink";


/*
 | ASSETS/IMAGES
 */
import AppLogo from "../../Assets/Images/icon.png";



/*
 | API LINKS
 */ 
const SIGNUP    = process.env.REACT_APP_API_HOST + "/signup";
const PLAN_LIST = process.env.REACT_APP_API_HOST + "/fetchPlanList";


const SignupPage = (props) => {

    const navigate = useNavigate();

    const [loading, onLoadChange] = useState(false);
    const [emailText, onEmailChange] = useState("");
    const [confirmPassText, onCPasswordChange] = useState("");
    const [planListFetched, onFetchPlanSuccess] = useState([]);

    const onSignup = (e) => {
        e.preventDefault();
        
        onLoadChange(true);

        let email,
            passw,
            cplan;

        email = document.getElementById("signup-page__email-input").value;
        passw = document.getElementById("signup-page__passw-input").value;
        cplan = document.getElementById("signup-page__plan-select").value;


        fetch(SIGNUP, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                email       : email , 
                password    : passw , 
                choosenPlan : cplan ,
            })
        })
        .then((res) => res.json())
        .then((res_json) => {
            onLoadChange(false);
            if (res_json.status === "ok")
            {
                return navigate("/signin");
            }
            
            onEmailChange(res_json.email);
        }, 
        (error) => {
            // 
            console.log(error);
        });
    }


    const onConfirmChange = () => {
        let passw,
            cpass;

        passw = document.getElementById("signup-page__passw-input").value;
        cpass = document.getElementById("signup-page__cpass-input").value;


        if (passw !== cpass)
            onCPasswordChange("Password does not matched!");
        else
            onCPasswordChange("");
                
    }

    (function LoadPlan() {
        /*
         | For code readablity and to group variables;
         */ 

        useEffect(function() {
            fetch(PLAN_LIST)
                .then((res) => res.json())
                .then((json_res) => onFetchPlanSuccess(json_res), 
                // callback when error
                (error) => console.log("Error fetching data at " + PLAN_LIST));
        }, []);

    })();


    return (
        <section className="d-block position-relative p-0 py-sm-5 w-100 h-100 bg-primary">

            {/* load?? */}
            {loading && <XLoading/>}

            {/* main panel */}
            <div id="signup-page__panel" className="card mx-auto rounded-0">
                <div className="card-header border-0 bg-transparent">
                    <div className="d-flex flex-row flex-nowrap align-items-center justify-content-sm-center mt-2 mb-5 mt-sm-3 mb-sm-4 px-2">
                        <img id="signup-page__app-icon" className="img rounded-circle shadow-sm" src={AppLogo} alt="app-icon"/>
                        <div id="signup-page__app-brand" className="d-flex flex-column mx-2">
                            <span className="fs-6 text-muted" role="banner">TodoHero</span>
                            <span className="fs-5 fw-bolder" role="banner">SIGNUP</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form method="GET" onSubmit={onSignup}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 pb-2">
                                    <XInput 
                                        id="signup-page__email-input" 
                                        iconClass="bi bi-envelope-fill"
                                        type="email"
                                        placeholder="email" required/>
                                    <small className="small text-danger">{emailText}</small>
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        id="signup-page__passw-input" 
                                        iconClass="bi bi-lock-fill"
                                        type="password"
                                        placeholder="password" 
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" 
                                        required/>
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        id="signup-page__cpass-input" 
                                        iconClass="bi bi-check-circle-fill"
                                        type="password"
                                        onChange={onConfirmChange} 
                                        placeholder="confirm password" 
                                        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" 
                                        required/>
                                    <small className="small text-danger">{confirmPassText}</small>
                                </div>
                                <div className="col-12 py-2">
                                    <XSelect
                                        id="signup-page__plan-select" 
                                        iconClass="bi bi-cash-coin"
                                        type="password"
                                        placeholder="confirm password">

                                        {planListFetched.map(function(data) {
                                            return (
                                                <option key={data.plan_name} value={data.id}>
                                                    {data.plan_name}
                                                </option>
                                            )
                                        })}

                                    </XSelect>
                                </div>
                                <div className="col-12 pt-2 ">
                                    <XButton id="signup-page__btn-signin" type="submit">
                                        SIGNUP
                                    </XButton>
                                </div>
                                <div className="col-12">
                                    <div className="container-fluid mt-2 text-center">
                                        <small className="small dark-on-mobile text-muted">Already have an account? <a className="light-on-mobile text-decoration-none" href="/signin">signin!</a></small>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center mt-5 w-100 text-center">
                                        <XRoundLink 
                                            id="signup-page__github-page-link" 
                                            iconClass="bi bi-github" 
                                            href="https://github.com/andydevs69420/technical-interview" />
                                        <span id="signup-page__star-on-github-label" className="small fw-bold mx-1 dark-on-mobile text-muted" aria-label="github-star-me"><i className="bi bi-star-fill small text-warning"></i> star on github</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* blob design 0 */}
            <svg id="signup-page__blob-design-0" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4DC435" d="M65,-26.2C71.6,-1,55.5,26.6,33.2,41.8C10.9,57.1,-17.4,60.1,-34.2,47.8C-50.9,35.4,-56,7.8,-48.3,-19C-40.7,-45.7,-20.3,-71.6,4.4,-73C29.2,-74.5,58.5,-51.5,65,-26.2Z" transform="translate(100 100)" />
            </svg>

            {/* blob design 1 */}
            <svg id="signup-page__blob-design-1" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M42.8,-34.6C57.9,-15.1,74.4,2.8,73.6,21.1C72.9,39.4,54.9,58,32.7,69.3C10.5,80.5,-16,84.4,-32.1,73.9C-48.1,63.3,-53.8,38.4,-58.3,14.5C-62.9,-9.5,-66.4,-32.6,-56.5,-50.8C-46.6,-69.1,-23.3,-82.5,-4.7,-78.7C13.8,-75,27.7,-54,42.8,-34.6Z" transform="translate(100 100)" />
            </svg>

        </section>
    );
}


export default SignupPage;
