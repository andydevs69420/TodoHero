




import 'package:flutter/material.dart';

void showSnackBar(BuildContext context, String message)
{
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(message,
        style: const TextStyle(
          color: Color(0xFF969626)
        ),
      ),
      backgroundColor: const Color(0xFF1D1F1D)
    )
  );
}

