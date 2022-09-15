import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/todos_tile.dart';

class Todos extends StatefulWidget {
  const Todos({super.key});

  @override
  State<Todos> createState() => _TodosState();
}

class _TodosState extends State<Todos> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15),
      child: Column(
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
    );
  }
}
