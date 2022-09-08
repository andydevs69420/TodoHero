/*
 *   Copyright (c) 2022 
 *   All rights reserved.
 */



const express = require("express");
const app = express();
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")("sk_test_51LfYbaKxrrZUvG9tzmJrV6QwQchQW7dFEXK2j2hG8va0I5lyhMOwqVrcYcuOrNsfLI1YMyKFcActTpGzGwb5uYkG002Ll4bLRI");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4000, () => console.log("Node server listening on port 4000!"));