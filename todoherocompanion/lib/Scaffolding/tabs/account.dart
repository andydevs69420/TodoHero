import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class Account extends StatefulWidget {
  const Account({super.key});

  @override
  State<Account> createState() => _AccountState();
}

class _AccountState extends State<Account> {
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.max,
      children: [
        CarouselSlider.builder(
          options: CarouselOptions(
            autoPlay: false
          ),
          itemCount: 100,
          itemBuilder: (context, index, index1) {
            return SizedBox(
              child: Text("Hola! $index"),
            );
          },
        )
      ],
    );
  }
}
