import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/Scaffolding/tabs/account.dart';
import 'package:todoherocompanion/Scaffolding/tabs/management.dart';
import 'package:todoherocompanion/Scaffolding/tabs/plan.dart';
import 'package:todoherocompanion/Scaffolding/tabs/todos.dart';
import 'package:todoherocompanion/state/shared_state.dart';

class Scaffolding extends StatefulWidget {
  const Scaffolding({super.key});

  @override
  State<Scaffolding> createState() => _ScaffoldingState();
}

class _ScaffoldingState extends State<Scaffolding> {
  late Object? args;
  late int selected;

  @override
  void initState() {
    selected = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    final args = (ModalRoute.of(context)?.settings.arguments ?? {}) as Map;

    log(args["cubit"]!.state.toString());

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text("TodoHero Mobile",
              style: TextStyle(
                fontWeight: FontWeight.w200,
                fontSize: 18,
              )),
        ),
        body: MultiBlocProvider(
          providers: [
            BlocProvider<SigninCubit>(create: (_) => args["cubit"]),
            BlocProvider<TodoHeroBloc>(create: (_) => TodoHeroBloc())
          ],
          child: MainApp(
            active: selected,
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          currentIndex: selected,
          showSelectedLabels: false,
          showUnselectedLabels: false,
          backgroundColor: Colors.blue[50],
          onTap: (int index) {
            if (index == selected) return;
            setState(() {
              selected = index;
            });
          },
          items: const [
            BottomNavigationBarItem(
              label: "Todos",
              icon: Icon(Icons.calendar_today),
            ),
            BottomNavigationBarItem(
              label: "Management",
              icon: Icon(Icons.grid_view_sharp),
            ),
            BottomNavigationBarItem(
              label: "Plan",
              icon: Icon(Icons.rocket_launch),
            ),
            BottomNavigationBarItem(
              label: "Account",
              icon: Icon(Icons.person),
            ),
          ],
        ),
      ),
    );
  }
}

class MainApp extends StatefulWidget {
  final int active;
  const MainApp({super.key, this.active = 0});

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {

  late var bloc = BlocProvider.of<TodoHeroBloc>(context);

  @override
  void initState() {
    super.initState();
    // load todos here!
    context.read<TodoHeroBloc>().add(LoadTodo());
  }

  @override
  Widget build(BuildContext context) {
    return BlocBuilder(
      bloc: TodoHeroBloc(),
        builder: (context, state) {
        switch (widget.active)
        {
          case 0: return Todos(bloc: bloc);
          case 1: return Management(bloc: bloc);
          case 2: return const Plan();
          default: return const Account();
        }
      },
    );
  }
}
