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
                Input(
                  icon: Icons.search,
                  placeholder: "search todo",
                  onChange: (value) {},
                ),
                Expanded(
                  child: ListView.builder(
                    itemCount: 12,
                    itemBuilder: (context, index) {

                      return ManagementTile(
                        title: "Hola $index",
                        description: "World",
                        date: "12/23/2022",
                        time: "08:30",
                        onTap: () {
                          log("Hello!");
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
