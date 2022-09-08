/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */


import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

/*
 | OTHER COMPONENTS
 */
import XButtonFlat from "../../../Components/XButton/XButtonFlat";


const XCheckout = ({id}) => {

    const onCheckout = (e) => {
        e.preventDefault();
        console.log("To Pay!");
    }

    return (
        <form id={id} onSubmit={onCheckout}>
            <PaymentElement/>
            <div className="d-block mt-3">
                <XButtonFlat>PAY</XButtonFlat>
            </div>
        </form>
    );
}


export default XCheckout;