import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:todoherocompanion/components/input.dart';

GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId:
        '254198304962-us4a78tpvt0c5raa3u6k3m2li402c6hm.apps.googleusercontent.com');

class Signin extends StatelessWidget {
  const Signin({super.key});

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        body: SigninBody(),
      ),
    );
  }
}

class SigninBody extends StatefulWidget {
  const SigninBody({super.key});

  @override
  State<SigninBody> createState() => _SigninBodyState();
}

class _SigninBodyState extends State<SigninBody> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.vertical,
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width * .90,
              child: Image.asset("assets/images/todo-bg.png"),
            ),
            Text(
              "TodoHero",
              style: TextStyle(
                  fontSize: MediaQuery.of(context).size.width * 0.12,
                  fontWeight: FontWeight.bold),
            ),
            const SizedBox(
              height: 25,
            ),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "SIGNIN",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            Form(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    child: Input(
                      icon: Icons.email,
                      placeholder: "email",
                      onChange: (value) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    child: Input(
                      icon: Icons.lock,
                      placeholder: "password",
                      obscureText: true,
                      onChange: (value) {},
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 5),
                    child: SizedBox(
                      width: double.infinity,
                      height: 38,
                      child: ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                const Color.fromARGB(255, 51, 121, 53))),
                        child: const Text("SIGNIN"),
                        onPressed: () {
                          Navigator.of(context)
                              .pushReplacementNamed("/mainapp");
                          log("Clicked!");
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 5),
                    child: SizedBox(
                      width: double.infinity,
                      height: 38,
                      child: ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all<Color>(Colors.white)),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          mainAxisSize: MainAxisSize.max,
                          children: [
                            SizedBox(
                              width: 20,
                              height: 20,
                              child: Image.asset("assets/images/google.png"),
                            ),
                            const SizedBox(width: 10),
                            const Text(
                              "GOOGLE SIGNIN",
                              style: TextStyle(
                                color: Colors.black87,
                              ),
                            )
                          ],
                        ),
                        onPressed: () {
                          log("Clicked!");
                        },
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 5, bottom: 5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        const Text("Don't have an account?"),
                        TextButton(
                          onPressed: () {
                            var response =
                                Navigator.of(context).pushNamed("/signup");
                            log(response.toString());
                          },
                          child: const Text("signup"),
                        )
                      ],
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
