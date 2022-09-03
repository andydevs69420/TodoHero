/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import $ from "jquery/dist/jquery";

import React, {useState, useEffect} from "react";
import "./scss/signup.css";



/*
 | OTHER COMPONENTS
 */ 

import XButton from "../../Components/XButton/XButton";
import XInput  from "../../Components/XInput/XInput";


/*
 | ASSETS/IMAGES
 */
import AppLogo from "../../Assets/Images/icon.png";
import XRoundLink from "../../Components/XRoundLink/XRoundLink";
import XSelect from "../../Components/XSelect/XSelect";


/*
 | API LINKS
 */ 
const SIGNUP    = process.env.REACT_APP_API_HOST + "/signup";
const PLAN_LIST = process.env.REACT_APP_API_HOST + "/fetchPlanList";


const SignupPage = (props) => {

    const [state, onStateUpdate] = useState({

        confirmPassText: "",
        planList: []
    });

    const onConfirmChange = () => {
        let passw,
            cpass;

        passw = $("#signup-page__passw-input").val();
        cpass = $("#signup-page__cpass-input").val();


        if (passw !== cpass)
            onStateUpdate((old) => ({
                ...old,
                confirmPassText: "Password does not matched!"
            }));
        else
            onStateUpdate((old) => ({
                ...old,
                confirmPassText: ""
            }));
                
    }

    const onSignup = (e) => {
        e.preventDefault();
        
        let email,
            passw,
            cplan;

        email = $("#signup-page__email-input").val();
        passw = $("#signup-page__passw-input").val();
        cplan = $("#signup-page__plan-select").val();


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
            // 
            console.log(res_json);
        }, 
        (error) => {
            // 
            console.log(error);
        });
    }


    (function LoadPlan() {
        /*
         | For code readablity and to group variables;
         */ 

        useEffect(function() {
            fetch(PLAN_LIST)
            .then((res) => res.json())
            .then((json_res) => {
                onStateUpdate({
                    ...state,
                    planList: json_res
                });
            }, 
            // callback when error
            (error) => {
                console.log("Error fetching data at " + PLAN_LIST);
            });
        }, []);

    })();


    return (
        <section className="d-block position-relative p-0 py-sm-5 w-100 h-100 bg-primary">

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
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        id="signup-page__passw-input" 
                                        iconClass="bi bi-lock-fill"
                                        type="password"
                                        placeholder="password" required/>
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        id="signup-page__cpass-input" 
                                        iconClass="bi bi-check-circle-fill"
                                        type="password"
                                        onChange={onConfirmChange} 
                                        placeholder="confirm password" required/>
                                    <strong className="small text-danger">{state.confirmPassText}</strong>
                                </div>
                                <div className="col-12 py-2">
                                    <XSelect
                                        id="signup-page__plan-select" 
                                        iconClass="bi bi-cash-coin"
                                        type="password"
                                        placeholder="confirm password">

                                        {state.planList.map(function(data) {
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
