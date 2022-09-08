/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */


import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import LoginHandler from "../LogginHandler";


import XButtonFlat from "../../../Components/XButton/XButtonFlat";

/*
 | IMAGE ASSET
 */ 
import CAROUSEL_BG  from "../../../Assets/Images/plan-bg.jpg";


/*
 | STRIPE API REQUIRED
 */ 
import XCheckout from "./XCheckout";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC);


const PLAN_LIST = process.env.REACT_APP_API_HOST + "/fetchPlanList";

function getAccountLink()
{
    const USER_LINK = process.env.REACT_APP_API_HOST + "/account/" + LoginHandler.getLoginCred().id;
    return USER_LINK;
}


const XSubscription = (props) => {

    const [userInfo,updateUserInfo] = useState({});
    const [selectPlan, updateSelectPlan] = useState({
        currentPlan: null
    });
    const [clientSecret, updateClientSecret] = useState("");
    const [planListFetched, onFetchPlanSuccess] = useState([]);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(function() {
        fetch(PLAN_LIST)
            .then((res) => res.json())
            .then((json_res) => onFetchPlanSuccess(json_res), 
            // callback when error
            (error) => console.log("Error fetching plans data at " + PLAN_LIST));
    }, []);


    useEffect(() => {
        const myCarousel = document.getElementById("xsubscription__plan-carousel");
        myCarousel.addEventListener('slide.bs.carousel', (event) => {
            // do something...
            updateClientSecret("");
            updateSelectPlan((old) => ({
                ...old, 
                currentPlan: parseInt(event.relatedTarget.getAttribute("data-index"))
            }));
        })
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
            {
                if( res_json.usrdata.plan_status_id === 1)
                onUpgrade();
                updateSelectPlan((old) => ({
                    ...old, 
                    currentPlan: res_json.usrdata.plan_id
                }));
                return updateUserInfo(res_json.usrdata);
            }
        },
        (error) => console.log("Error transmitting data at " + getAccountLink() + "/get"));
    }

    /** on upgrade account */ 
    const onUpgrade = () => {
        fetch("http://localhost:4000/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(planListFetched[selectPlan.currentPlan]),
        })
        .then((res) => res.json())
        .then((data) => updateClientSecret(data.clientSecret));
    }
    
    /** Check if upgradable account */
    const isUpgradeable = () => {
        if (!selectPlan.currentPlan)
            return false;
        return selectPlan.currentPlan !== userInfo.plan_id;
    }


    /** Check if upgradable account */
    const isExpired = () => {
        return clientSecret? true: (clientSecret && !isUpgradeable());
    }


    /** non function */ 

    const appearance = {
        theme: "stripe",
    };
    const options = {
        clientSecret,
        appearance  ,
    };

    return (
        <section id="xaccount__main" className="d-block position-relative p-0 p-sm-3 w-100 h-100">

            <div className="container-fluid p-4 bg-white shadow-sm">
                <div className="row gy-5 gy-md-0">
                    <div className="col-12 col-md-6">
                        <div className="container mb-3 px-0">
                            <div id="xsubscription__plan-carousel" className="carousel slide" data-interval={false}>
                                <div className="carousel-inner rounded shadow">
                                    {planListFetched.map(function(data) {
                                        return (
                                            <div className={"carousel-item position-relative" + ((data.plan_id === userInfo.plan_id)?" active":"")} key={data.plan_id} data-index={data.plan_id}>
                                                <img src={CAROUSEL_BG} className="d-block img-fluid w-100" alt="carousel-bg"/>
                                                <span className="d-block position-absolute top-0">{data.plan_id}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#xsubscription__plan-carousel" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#xsubscription__plan-carousel" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="container-fluid px-0">
                            <div className="row gy-2">
                                {/* plan name */}
                                <div className="col-6">
                                    <span className="fw-bold text-muted"><i className="bi bi-ticket-fill"></i> PLAN</span>
                                </div>
                                <div className="col-6 col-md-auto">
                                    <span className="text-muted">{userInfo.plan_name?.toUpperCase()}</span>
                                </div>
                                {/* plan status */}
                                <div className="col-6">
                                    <span className="fw-bold text-muted"> <i className="bi bi-heart-fill text-muted"></i> STATUS</span>
                                </div>
                                <div className="col-6 col-md-auto">
                                    <span className="text-muted">{userInfo.plan_status_name?.toUpperCase()}</span>
                                </div>
                                {/* on upgrade */}
                                {isUpgradeable() &&
                                    <div className="col-12 col-md-5">
                                        <XButtonFlat className="text-white btn-sm" btnTheme="btn-success" onClick={onUpgrade}>SELECT PLAN {selectPlan.currentPlan}</XButtonFlat>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4">
                        {(clientSecret || isExpired())?
                            (
                                <Elements options={options} stripe={stripePromise}>
                                    <XCheckout />
                                </Elements>
                            )
                            :
                            "asdasdasdasdasd"
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default XSubscription;