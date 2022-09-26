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
  static const host   = "192.168.43.76:8080";
  static final client = http.Client();
}
// redodophilippandrew@gmail.com

class SignupRepository 
{
  
  SignupRepository();

  static Map<String, dynamic> placeholder = {};

  /**
   * Fetches plan type(s) from api server
   * @return Future<List> list of plans
   **/ 
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

  get ID => state["id"];
  get EMAIL => state["email"];

  /**
   * Saves user info
   * @param user Map use info
   * @return null
   **/ 
  Future<void> save(Map user) async {
   emit({...state, "id": user["id"], "email": user["email"], "isgoogle": user["isgoogle"]});
  }

}

class TodoHeroBloc extends Bloc<TodoHeroEvent, Map> {
  TodoHeroBloc() : super(inAppState) {
    on<LoadTodo>(handleLoad);
  }

  static Map inAppState = {
    "todos": []
  };

  Future<dynamic> handleLoad(event, emit) async 
  { return emit({...state, "todos": await event.loadTodo()}); }

}

abstract class TodoHeroEvent {}
class LoadTodo extends TodoHeroEvent {

  final int userID;
  LoadTodo({required this.userID});

  Future<List> loadTodo() async {
    var jsonData = [];
    try {
      var data = await API.client.get(Uri.http(API.host, "api/todo/$userID/fetchTodos"));
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }
}

class InsertTodo extends Cubit<int> {

  final int userID;
  InsertTodo({required this.userID}): super(0);

  Future<Map> insertTodo({required String title, required String date, required String time, required String description}) async
  {
    var jsonData = {};
    try {
      var data = await API.client.post(Uri.http(API.host, "api/todo/$userID/insert"), 
        body: {
          "title": title,
          "date" : date,
          "time" : time,
          "descr": description
        }
      );
      jsonData = jsonDecode(data.body);
    } catch(err) {
      log(err.toString());
    }
    return jsonData;
  }

}
