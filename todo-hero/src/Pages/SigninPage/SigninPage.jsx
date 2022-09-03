/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React, {useState, useEffect} from "react";
import "./scss/signin.css";


import GoogleLogin from "react-google-login";

/*
 | OTHER COMPONENTS
 */ 

import XInput  from "../../Components/XInput/XInput";
import XButton from "../../Components/XButton/XButton";
import XRoundLink from "../../Components/XRoundLink/XRoundLink";


/*
 | ASSETS/IMAGES
 */
import AppLogo from "../../Assets/Images/icon.png";
import TodoLogo from "../../Assets/Images/todo-bg.png";

const SigninPage = () => {

    const [greet, onGreetUpdate] = useState("");


    const onSignin = (e) => {
        e.preventDefault();

        let email,
            passw;
        
        

        alert("fooc");
    }

    (function RenderGreet() {
        /** greeting delay */
        const greetValue = "Welcome to TodoHero!";
        
        useEffect(() => {
            for(let idx = 0; idx < greetValue.length; idx++) 
            { 
                setTimeout(function() {
                    return onGreetUpdate((oldValue) => (oldValue + greetValue[idx]));
                }, (idx * 100)); 
            }
        }, [/**/]);
    })();


    return (
        <section id="signin-page" className="d-block position-relative p-0 py-sm-5 w-100 h-100 bg-primary">
            
            {/* background */}
            <div id="signin-page__bg" className="d-inline-block position-absolute">
                <img id="signin-page__app-bg" className="d-block img mx-auto" src={TodoLogo} alt="todo-icon"/>
                <h2 className="display-6 text-light text-center">{greet}</h2>
            </div>
            
            {/* main panel */}
            <div id="signin-page__panel" className="card rounded-0">
                <div className="card-header border-0 bg-transparent">
                    <div className="d-flex flex-row flex-nowrap align-items-center justify-content-sm-center mt-2 mb-5 mt-sm-3 mb-sm-4 px-2">
                        <img id="signin-page__app-icon" className="img rounded-circle shadow-sm" src={AppLogo} alt="app-icon"/>
                        <div id="signin-page__app-brand" className="d-flex flex-column mx-2">
                            <span className="fs-6 text-muted" role="banner">TodoHero</span>
                            <span className="fs-5 fw-bolder" role="banner">SIGNIN</span>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form method="GET" onSubmit={onSignin}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 pb-2">
                                    <XInput 
                                        id="signin-page__email-input"
                                        iconClass="bi bi-envelope-fill"
                                        type="email"
                                        placeholder="email"/>
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        id="signin-page__passw-input"
                                        iconClass="bi bi-lock-fill"
                                        type="password"
                                        placeholder="password"/>
                                </div>
                                <div className="col-12 pt-2 ">
                                    <XButton id="signin-page__btn-signin" type="submit">
                                        SIGNIN
                                    </XButton>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-row flex-nowrap align-items-center w-100">
                                        <hr className="d-block w-100"/>
                                        <span className="d-block mx-1 small dark-on-mobile text-muted">OR</span>
                                        <hr className="d-block w-100"/>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <GoogleLogin className="btn btn-light justify-content-center align-items-center w-100 rounded"
                                        clientId={2}
                                        onSuccess={console.log}
                                        onFailure={console.log}>
                                        SIGNIN WITH GOOGLE
                                    </GoogleLogin>
                                </div>
                                <div className="col-12">
                                    <div className="container-fluid mt-2 text-center">
                                        <small className="small dark-on-mobile text-muted">Don't have an account? <a className="light-on-mobile text-decoration-none" href="/signup">signup now!</a></small>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="container-fluid text-center">
                                        <a className="small light-on-mobile text-decoration-none" href="/asdad">forgot password?</a>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center mt-5 w-100 text-center">
                                        <XRoundLink 
                                            id="signin-page__github-page-link" 
                                            iconClass="bi bi-github" 
                                            href="https://github.com/andydevs69420/technical-interview" />
                                        <span id="signin-page__star-on-github-label" className="small fw-bold mx-1 dark-on-mobile text-muted" aria-label="github-star-me"><i className="bi bi-star-fill small text-warning"></i> star on github</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* blob design 0 */}
            <svg id="signin-page__blob-design-0" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4DC435" d="M65,-26.2C71.6,-1,55.5,26.6,33.2,41.8C10.9,57.1,-17.4,60.1,-34.2,47.8C-50.9,35.4,-56,7.8,-48.3,-19C-40.7,-45.7,-20.3,-71.6,4.4,-73C29.2,-74.5,58.5,-51.5,65,-26.2Z" transform="translate(100 100)" />
            </svg>

            {/* blob design 1 */}
            <svg id="signin-page__blob-design-1" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M42.8,-34.6C57.9,-15.1,74.4,2.8,73.6,21.1C72.9,39.4,54.9,58,32.7,69.3C10.5,80.5,-16,84.4,-32.1,73.9C-48.1,63.3,-53.8,38.4,-58.3,14.5C-62.9,-9.5,-66.4,-32.6,-56.5,-50.8C-46.6,-69.1,-23.3,-82.5,-4.7,-78.7C13.8,-75,27.7,-54,42.8,-34.6Z" transform="translate(100 100)" />
            </svg>

        </section>
    );
}

export default SigninPage;