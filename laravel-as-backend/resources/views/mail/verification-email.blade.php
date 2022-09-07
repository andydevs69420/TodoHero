<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>VERIFICATION EMAIL</title>
        <style>
            * {
                margin: 0;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            body
            { background-color: rgb(241, 227, 227); }

            #center
            {
                display: block;
                margin: 4rem auto;
                padding: 3rem 0;
                width: 90%;
                height: auto;
                background-color: #fff;
                box-shadow: 0px 0px 3px rgba(0,0,0,0.1);
            }

            #sender-brand
            {
                padding: 1rem 0;
                text-align: center;
                margin-bottom: 2rem;
            }

            #wrapper
            {
                display: block;
                margin: 0 auto;
                max-width: 50%;
            }

            #mailcontent
            {
                font-size: 1.25rem;
                overflow-wrap: break-word;
            }


            @media screen and (max-width: 576px)
            {
                #wrapper
                {
                    max-width: 100%;
                }
            }
        </style>
    </head>
    <body>
        <div id="center">
            <h1 id="sender-brand">TodoHero</h1>
            <div id="wrapper">
                <p id="mailcontent">
                    Welcome! Thankyou for signing up using your email <q>{{"user->email"}}</q>.
                    Here is your {{ "" }}
                </p>
            </div>
        </div>
    </body>
</html>
