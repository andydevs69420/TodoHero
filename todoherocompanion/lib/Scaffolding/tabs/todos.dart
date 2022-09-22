import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/todos_tile.dart';
import 'package:todoherocompanion/state/shared_state.dart';

class Todos extends StatefulWidget {
  final TodoHeroBloc bloc;
  const Todos({super.key, required this.bloc});

  @override
  State<Todos> createState() => _TodosState();
}

class _TodosState extends State<Todos> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: widget.bloc,
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          children: [
            Input(
              icon: Icons.search,
              placeholder: "search todo",
              onChange: (value) {
              
              },
            ),
            Expanded(
              child: ListView.builder(
                itemCount: 12,
                itemBuilder: (context, index) {
                  return TodosTile(
                    title: "Hola $index",
                    date: "12/23/2022",
                    time: "08:30",
                    onTap: () {
                      log("Hello!");
                    },
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
