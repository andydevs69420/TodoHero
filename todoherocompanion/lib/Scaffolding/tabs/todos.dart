import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/management_tile.dart';
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
    context.read<TodoHeroBloc>().add(LoadTodo());
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: widget.bloc,
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(
          children: [
            Material(
              elevation: 6,
              shadowColor: Colors.grey.withOpacity(.4),
              borderRadius: BorderRadius.circular(6),
              child: Input(
                borderRadius: 6,
                borderColor: Colors.transparent,
                icon: Icons.search,
                placeholder: "search todo",
                onChange: (value) {},
              ),
            ),
            Expanded(
              child: BlocConsumer<TodoHeroBloc, Map>(
                listener: (context, state) {
                  log(state.toString());
                },
                builder: (context, state) {
                  return ListView.builder(
                    itemCount: state["todos"].length,
                    itemBuilder: (context, index) 
                    {
                      Map current = state["todos"][index];
                      
                      return ManagementTile(
                        title: current["title"],
                        description: current["description"],
                        date: current["date"],
                        time: current["time"],
                        onTap: () {
                          log("Hello!");
                        },
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
