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


class SignupRepository {
  
  SignupRepository();

  static Map<String, dynamic> placeholder = {};

  /**
   * Fetches plan type(s) from api server
   * @return Future<List> list of plans
   **/ 
  //  OR USE Repository instead
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

}


class SigninCubit extends Cubit<Map> {
  SigninCubit():super(placeholder);


  static const placeholder = {
    "isSignedin": false,
    "id": null,
    "email": null,
    "isgoogle": null
  };

  /**
   * Saves user info
   * @param user Map use info
   * @return null
   **/ 
  Future<void> save(Map user) async {
   emit({...state, "id": user["id"], "email": user["email"], "isgoogle": user["isgoogle"]});
  }

}

class TodoHeroBloc extends Bloc<TodoHeroState, Map> {
  TodoHeroBloc() : super(inAppState) {

    on<LoadTodo>(loadTodo);

  }

  static Map inAppState = {
    "todos": []
  };

  void loadTodo(event, emit) async
  {
    var jsonData = {};
    try {
      var data = await API.client.post(Uri.http(API.host, "/todo/${SigninCubit.placeholder["id"]}/fetchTodos"));
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return;
  }

}

abstract class TodoHeroState {}
class LoadTodo extends TodoHeroState {}
