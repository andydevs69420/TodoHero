import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/management_tile.dart';
import 'package:todoherocompanion/state/shared_state.dart';

class Management extends StatefulWidget {
  final TodoHeroBloc bloc;
  const Management({super.key, required this.bloc});

  @override
  State<Management> createState() => _ManagementState();
}

class _ManagementState extends State<Management> {
  String search = "";

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: widget.bloc,
      child: Padding(
        padding: const EdgeInsets.only(top: 15, left: 15, right: 15),
        child: Stack(
            children: [
              Column(
              mainAxisSize: MainAxisSize.max,
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
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.only(bottom: 15),
                child: FloatingActionButton(
                  backgroundColor: const Color(0xFFA18635),
                  onPressed: () {
                    context.read<TodoHeroBloc>().add(LoadTodo());
                  },
                  child: const Icon(Icons.create),
                ),
              ),
            )
          ]
        )
      ),
    );
  }
}
