import 'package:flutter/material.dart';


class TextArea extends StatefulWidget {
  final TextEditingController? controller;
  final String placeholder;
  final double borderRadius;
  final double borderWidth;
  final int lines;
  final bool obscureText;
  final Function(String value)? onChange;
  final Function(String? value)? onSave;
  final String? Function(String? value)? validator;
  final Color borderColor;

  const TextArea(
      {super.key,
      this.controller,
      this.placeholder  = "input",
      this.borderRadius = 6,
      this.borderWidth  = 1,
      this.lines        = 2,
      this.obscureText  = false,
      this.onChange,
      this.onSave,
      this.validator, 
      this.borderColor = Colors.grey,
    });

  @override
  State<TextArea> createState() => _TextAreaState();
}

class _TextAreaState extends State<TextArea> {
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
            borderRadius: BorderRadius.all(Radius.circular(widget.borderRadius)),
            borderSide: BorderSide(
              color: widget.borderColor,
              width: widget.borderWidth,
            )
          ),
          hintText: widget.placeholder,
          alignLabelWithHint: true,
          labelText: widget.placeholder),
      onChanged: widget.onChange,
      textAlignVertical: TextAlignVertical.bottom,
      minLines: widget.lines,
      maxLines: widget.lines * 2,
    );
  }
}