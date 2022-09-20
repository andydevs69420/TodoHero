// ignore_for_file: slash_for_doc_comments

/*
 | Uses flutter_bloc for state management
 | SharedState
 */

import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:flutter_bloc/flutter_bloc.dart';

class API {
  static const host   = "localhost:8000";
  static final client = http.Client();
}


class SignupCubit extends Cubit<Map> {
  SignupCubit() : super(placeholder);

  static Map<String, dynamic> placeholder = {};

  /**
   * Fetches plan type(s) from api server
   * @return Future<List> list of plans
   **/ 
  Future<List> fetchPlanList() async {
    var jsonData = [];
    try {
      var data = await API.client.get(Uri.http(API.host, "api/fetchPlanList"));
      // jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }

  /**
   * Signup attempt
   * @param email String user email
   * @param password String user password
   * @param planID String user selected plan
   * @return Future<Map> server response
   **/ 
  Future<Map> signup(String email, String password, String planID) async {
    var jsonData = {};
    try {
      var data = await API.client.post(
        Uri.http(API.host, "api/signup"),
        body: {
          "email": email,
          "password": password,
          "choosenPlan": planID
        }
      );
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }

}


class SigninCubit extends Cubit<Map> {
  SigninCubit():super(placeholder);


  static const placeholder = {
    "isSignedin": false,
    "uid": null,
    "email": null,
    "isgoogle": null
  };

  Future<Map> signin(String email, String password) async {
    var jsonData = {};
    try {
      var data = await API.client.post(
        Uri.http(API.host, "api/signin"),
        body: {
          "email": email,
          "password": password,
        }
      );
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }

}

class SharedState extends Bloc<TodoHerState, int> {
  SharedState() : super(0);
}

abstract class TodoHerState {}
