import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/Scaffolding/scaffolding.dart';
import 'package:todoherocompanion/pages/signin.dart';
import 'package:todoherocompanion/pages/signup.dart';
import 'package:todoherocompanion/state/shared_state.dart';

void main() {
  runApp(const TodoHeroCompanion());
}

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => TodoHeroBloc(),
      child: const TodoHeroCompanion(),
    );
  }
}

class TodoHeroCompanion extends StatelessWidget {
  const TodoHeroCompanion({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.blue),
      initialRoute: "/signin",
      routes: {
        "/signin": (context) => const Signin(),
        "/signup": (context) => const Signup(),
        "/mainapp": (context) => const Scaffolding(),
      },
    );
  }
}
