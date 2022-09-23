import 'package:flutter/material.dart';

class Input extends StatefulWidget {
  final TextEditingController? controller;
  final IconData icon;
  final String placeholder;
  final double borderRadius;
  final bool obscureText;
  final Function(String value)? onChange;
  final Function(String? value)? onSave;
  final String? Function(String? value)? validator;
  final Color borderColor;

  const Input(
      {super.key,
      this.controller,
      this.icon = Icons.file_copy_outlined,
      this.placeholder = "input",
      this.borderRadius = 6,
      this.obscureText = false,
      this.onChange,
      this.onSave,
      this.validator, 
      this.borderColor = Colors.grey});

  @override
  State<Input> createState() => _InputState();
}

class _InputState extends State<Input> {
  @override
  Widget build(BuildContext context) {
    return TextFormField( 
      controller: widget.controller,
      onSaved: widget.onSave,
      validator: widget.validator,
      decoration: InputDecoration(
          isDense: true,
          border: OutlineInputBorder(
              borderRadius:
                BorderRadius.all(Radius.circular(widget.borderRadius))),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: widget.borderColor
            )
          ),
          prefixIcon: Icon(widget.icon),
          hintText: widget.placeholder,
          labelText: widget.placeholder),
      obscureText: widget.obscureText,
      onChanged: widget.onChange,
    );
  }
}
