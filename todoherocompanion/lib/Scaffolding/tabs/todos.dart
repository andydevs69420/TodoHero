import 'package:flutter/material.dart';
import 'package:todoherocompanion/components/input.dart';

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
        ],
      ),
    );
  }
}
