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


/*
 | ASSETS/IMAGES
 */
import APPLOGO from "../../Assets/Images/icon.png";

class SigninPage extends React.Component
{
    render()
    {
        return (
            <section id="signin-page" className="d-block position-relative p-0 py-md-5 w-100 h-100 bg-primary">
                
                
                {/* main panel */}
                <div id="signin-page__panel" className="card rounded-0">
                    <div className="card-header border-0 bg-transparent">
                        <div className="d-flex flex-row flex-nowrap align-items-center mt-2 mb-4 my-md-3">
                            <img id="signin-page__app-icon" className="img rounded-circle shadow-sm" src={APPLOGO} alt="app-icon"/>
                            <div className="d-flex flex-column mx-2">
                                <span className="fs-6 text-muted" role="banner">Todo-Hero</span>
                                <span className="fs-5 fw-bolder" role="banner">SIGNIN</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container-fluid px-0">
                            <div className="row">
                                <div className="col-12">
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

            </section>
        );
    }
}


export default SigninPage;