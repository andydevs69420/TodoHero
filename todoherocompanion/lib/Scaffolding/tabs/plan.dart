import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class Plan extends StatefulWidget {
  const Plan({super.key});

  @override
  State<Plan> createState() => _PlanState();
}

class _PlanState extends State<Plan> {
    @override
    Widget build(BuildContext context) {
        return Column(
            mainAxisSize: MainAxisSize.max,
            children: [
                CarouselSlider(
                    items: items, 
                    options: options
                )
            ],
    );
    }
}
