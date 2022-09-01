/*
 *   Copyright (c) 2022 andydevs69420
 *   All rights reserved.
 */

import React from "react";
import "./scss/signin.css";


/*
 | OTHER COMPONENTS
 */ 

import XButton from "../../Components/XButton/XButton";
import XInput  from "../../Components/XInput/XInput";


/*
 | ASSETS/IMAGES
 */
import AppLogo from "../../Assets/Images/icon.png";
import TodoLogo from "../../Assets/Images/todo-bg.png";

class SigninPage extends React.Component
{
    render()
    {
        return (
            <section id="signin-page" className="d-block position-relative p-0 py-md-5 w-100 h-100 bg-primary">
                
                {/* background */}
                <div id="signin-page__bg" className="d-inline-block position-absolute w-50">
                    <img id="signin-page__app-bg" className="img-fluid rounded-circle shadow-sm" src={TodoLogo} alt="todo-icon"/>
                </div>

                
                {/* main panel */}
                <div id="signin-page__panel" className="card rounded-0">
                    <div className="card-header border-0 bg-transparent">
                        <div className="d-flex flex-row flex-nowrap align-items-center mt-2 mb-5 mt-md-1 mb-md-3">
                            <img id="signin-page__app-icon" className="img rounded-circle shadow-sm" src={AppLogo} alt="app-icon"/>
                            <div id="signin-page__app-brand" className="d-flex flex-column mx-2">
                                <span className="fs-6 text-muted" role="banner">TodoHero</span>
                                <span className="fs-5 fw-bolder" role="banner">SIGNIN</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-12 pb-2">
                                    <XInput 
                                        iconClass="bi bi-envelope-fill"
                                        type="email"
                                        placeholder="email"/>
                                </div>
                                <div className="col-12 py-2">
                                    <XInput 
                                        iconClass="bi bi-lock-fill"
                                        type="password"
                                        placeholder="password"/>
                                </div>
                                <div className="col-12 pt-2">
                                    <XButton id="signin-page__btn-signin">
                                        SIGNIN
                                    </XButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* blob design 0 */}
                <svg id="signin__blob-design-0" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#4DC435" d="M65,-26.2C71.6,-1,55.5,26.6,33.2,41.8C10.9,57.1,-17.4,60.1,-34.2,47.8C-50.9,35.4,-56,7.8,-48.3,-19C-40.7,-45.7,-20.3,-71.6,4.4,-73C29.2,-74.5,58.5,-51.5,65,-26.2Z" transform="translate(100 100)" />
                </svg>

                {/* blob design 1 */}
                <svg id="signin__blob-design-1" className="position-fixed" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFFFFF" d="M42.8,-34.6C57.9,-15.1,74.4,2.8,73.6,21.1C72.9,39.4,54.9,58,32.7,69.3C10.5,80.5,-16,84.4,-32.1,73.9C-48.1,63.3,-53.8,38.4,-58.3,14.5C-62.9,-9.5,-66.4,-32.6,-56.5,-50.8C-46.6,-69.1,-23.3,-82.5,-4.7,-78.7C13.8,-75,27.7,-54,42.8,-34.6Z" transform="translate(100 100)" />
                </svg>

            </section>
        );
    }
}


export default SigninPage;