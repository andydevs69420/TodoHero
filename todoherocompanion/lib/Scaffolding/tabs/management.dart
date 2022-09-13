import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/management_tile.dart';

class Management extends StatefulWidget {
  const Management({super.key});

  @override
  State<Management> createState() => _ManagementState();
}

class _ManagementState extends State<Management> {
  String search = "";

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15),
      child: Column(
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
                  title: "Hola",
                  description: "World",
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
