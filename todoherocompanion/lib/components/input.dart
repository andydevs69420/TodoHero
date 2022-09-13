import 'package:flutter/material.dart';

class Input extends StatefulWidget {
  final IconData icon;
  final String placeholder;
  final double borderRadius;
  final bool obscureText;
  final Function(String value) onChange;

  const Input(
      {super.key,
      this.icon = Icons.file_copy_outlined,
      this.placeholder = "input",
      this.borderRadius = 6,
      this.obscureText = false,
      required this.onChange});

  @override
  State<Input> createState() => _InputState();
}

class _InputState extends State<Input> {
  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 6,
      borderRadius: BorderRadius.all(Radius.circular(widget.borderRadius)),
      shadowColor: Colors.black.withAlpha(110),
      child: TextFormField(
        decoration: InputDecoration(
            isDense: true,
            border: OutlineInputBorder(
                borderRadius:
                    BorderRadius.all(Radius.circular(widget.borderRadius))),
            enabledBorder: InputBorder.none,
            prefixIcon: Icon(widget.icon),
            hintText: widget.placeholder,
            labelText: widget.placeholder),
        obscureText: widget.obscureText,
        onChanged: (value) => widget.onChange(value),
      ),
    );
  }
}
