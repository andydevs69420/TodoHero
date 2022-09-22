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
  late int selected;

  @override
  void initState() {
    selected = 0;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
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
            BlocProvider<SigninCubit>(create: (_) => SigninCubit()),
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

  late var bloc;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    bloc = BlocProvider.of<TodoHeroBloc>(context);

    return BlocBuilder(
      bloc: TodoHeroBloc(),
        builder: (context, state) {
        // ignore: unnecessary_new
        switch (widget.active)
        {
          case 0: return Todos(bloc: bloc);
          case 1: return const Management();
          case 2: return const Plan();
          default: return const Account();
        }
      },
    );
  }
}
