import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart' as http;
import 'package:flutter_bloc/flutter_bloc.dart';

class API {
  static const host = "localhost:8000";
  static final client = http.Client();
}


class SignupCubit extends Cubit<Map> {
  SignupCubit() : super(placeholder);

  static Map<String, dynamic> placeholder = {};

  /// Fetches plan type(s) from api server
  /// 
  /// @returns List list of plans
  Future<List> fetchPlanList() async {
    var jsonData = [];
    try {
      var data = await API.client.get(Uri.http(API.host, "api/fetchPlanList"));
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }

  /// Attempts to signup
  ///
  /// @params email String user's email
  /// 
  /// @params password String user's password
  /// 
  /// @params planID String user's selected plan
  /// 
  /// @returns Map server's response on signup
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

class SharedState extends Bloc<TodoHerState, int> {
  SharedState() : super(0);
}

abstract class TodoHerState {}
