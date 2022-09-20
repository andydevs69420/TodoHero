import 'package:flutter/material.dart';
import 'package:todoherocompanion/Scaffolding/tabs/account.dart';
import 'package:todoherocompanion/Scaffolding/tabs/management.dart';
import 'package:todoherocompanion/Scaffolding/tabs/plan.dart';
import 'package:todoherocompanion/Scaffolding/tabs/todos.dart';

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
        body: MainApp(
          active: selected,
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
  final List<Widget> tabs = [
    const Todos(),
    const Management(),
    const Plan(),
    const Account(),
  ];

  @override
  Widget build(BuildContext context) {
    return tabs[widget.active];
  }
}
