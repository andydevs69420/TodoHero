import 'dart:developer';

import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/state/shared_state.dart';

class Signup extends StatelessWidget {
  const Signup({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: BlocProvider<SignupCubit>(
          create: (_) => SignupCubit(),
          child: const SignupBody(),
        ),
      ),
    );
  }
}

class SignupBody extends StatefulWidget {
  const SignupBody({super.key});

  @override
  State<SignupBody> createState() => _SignupBodyState();
}

class _SignupBodyState extends State<SignupBody> {

  var formKey = GlobalKey<FormState>();
  var emailCtrl = TextEditingController();
  var passwordCtrl = TextEditingController();

  String? email;
  String? password;
  int? planID;

  late bool isPressed;


  @override
  void initState() {
    isPressed = false;
    super.initState();
  }

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
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                "SIGNUP",
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            Form(
              key: formKey,
              child: Column(
                children: [

                  ////////////////////// EMAIL FIELD /////////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    child: Input(
                      controller: emailCtrl,
                      icon: Icons.email,
                      placeholder: "email",
                      validator: (value) {
                        if (value!.isEmpty)
                        { return "email field is required!*"; }

                        if (!EmailValidator.validate(value))
                        { return "invalid email format!"; }

                        return null;
                      },
                    ),
                  ),
                  ////////////


                  ///////////////////// PASSWORD FIELD //////////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    child: Input(
                      controller: passwordCtrl,
                      icon: Icons.lock,
                      placeholder: "password",
                      obscureText: true,
                      validator: (value) {
                        if (value!.isEmpty)
                        { return "password field is required!*"; }

                        if (value.length < 8)
                        { return "password length should atleast 8 characters!"; }
                        
                        return null;
                      },
                    ),
                  ),
                  ////////////


                  ////////////////////////// CONFIRM PASSWORD FIELD //////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: 10, bottom: 10),
                    child: Input(
                      icon: Icons.check_circle,
                      placeholder: "confirm password",
                      obscureText: true,
                      validator: (value) {
                        if (value!.isEmpty)
                        { return "this field is required!*"; }
                        if (value != passwordCtrl.text) 
                        { return "password did not match!";  }
                        return null;
                      },
                    ),
                  ),
                  ////////////



                  ////////////////////////// PLAN DROPDOWN ////////////////////////
                  FutureBuilder(
                    future: context.read<SignupCubit>().fetchPlanList(),
                    builder: (context, snapshot) {
                      if (snapshot.connectionState == ConnectionState.waiting)
                      { return const Text("loading..."); }
                    
                      if (!snapshot.hasData)
                      { return const Text("No data");}

                      List data = snapshot.hasData?snapshot.data as List:[];

                      if (data.isEmpty)
                      { return const Text("No data");}
                      
                      return Padding(
                        padding: const EdgeInsets.only(top: 10, bottom: 10),
                        child: DropdownButtonFormField(
                          hint: const Text("Select Plan"),
                          isExpanded: true,
                          menuMaxHeight: 300,
                          onChanged: (select) {
                            planID = int.parse(select.toString());
                          },
                          validator: (value) {
                            if (value == null)
                            { return "please select plan type!"; }
                            return null;
                          },
                          items: data.map((e) {
                            return DropdownMenuItem(
                              value: e["plan_id"], 
                              child: Text(e["plan_name"])
                            );
                          }).toList(),
                        )
                      );
                    },
                  ),
                  //////////////
                  


                  ///////////////////////// SIGNUP BUTTON ////////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: 10),
                    child: SizedBox(
                      width: double.infinity,
                      height: 38,
                      child: ElevatedButton(
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                const Color.fromARGB(255, 51, 121, 53))),
                        child: const Text("SIGNUP"),
                        onPressed: () async {

                          if (isPressed)
                          { return; }

                          if (formKey.currentState!.validate())
                          {
                            isPressed = true;

                            Map result = await context.read<SignupCubit>().signup(
                              emailCtrl.text, passwordCtrl.text, planID.toString()
                            );

                            if (result["status"] != "ok")
                            { // show error snackbar
                              // ignore: use_build_context_synchronously
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(content: Text(result["message"]))
                              );
                              setState(() {
                                isPressed = false;
                              });
                              return;
                            }

                            // pop and return
                            // ignore: use_build_context_synchronously
                            Navigator.of(context).pop(true);
                            return;
                          }
                        },
                      ),
                    ),
                  ),
                  //////////


                  ///////////////////////// SIGNIN LINK /////////////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: 5, bottom: 5),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        const Text("Already have an account?"),
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: const Text("signin"),
                        )
                      ],
                    ),
                  )
                  ////////////
             
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
