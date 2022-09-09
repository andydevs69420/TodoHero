/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */


import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

/*
 | OTHER COMPONENTS
 */
import XButtonFlat from "../../../Components/XButton/XButtonFlat";


import LoginHandler from "../LogginHandler";


function getAccountLink()
{
    const USER_LINK = process.env.REACT_APP_API_HOST + "/account/" + LoginHandler.getLoginCred().id;
    return USER_LINK;
}


const XCheckout = ({plan}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);


        const savePlan = (plan) => {
            fetch(getAccountLink() + "/update/plan", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(plan)
            })
            .then((res) => res.json())
            .then((res_json) => {
                console.log(res_json.message);
            },
            (error) => console.log(getAccountLink() + "/update/plan"));
        }

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: (function() {

                    // save
                    savePlan(plan);

                    return "http://localhost:3000/todoheroapp/subscription";
                })(),
            },
        });
       
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <div className="d-block mt-3">
                <XButtonFlat disabled={isLoading || !stripe || !elements} id="submit">
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                    </span>
                </XButtonFlat>
            </div>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}



export default XCheckout;