import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class Plan extends StatefulWidget {
  const Plan({super.key});

  @override
  State<Plan> createState() => _PlanState();
}

class _PlanState extends State<Plan> {

  // with data
  Widget onData() {
    return Column(
      mainAxisSize: MainAxisSize.max,
      children: [
        SizedBox(
          width: double.infinity,
          child: CarouselSlider.builder(
            options: CarouselOptions(
              viewportFraction: 1,
            ),
            itemCount: 6,
            itemBuilder: (context, i, j) {
              return Padding(
                padding: const EdgeInsets.all(15),
                child: Material(
                  elevation: 6,
                  child: Container(
                    decoration: BoxDecoration(
                      image: const DecorationImage(
                        image: AssetImage("assets/images/plan-bg.jpg"),
                        fit: BoxFit.fitWidth
                      ),
                      borderRadius: BorderRadius.circular(10)
                    ),
                    child: null,
                  ),
                ),
              );
            },
          ),
        )
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: onData(),
    );
  }
}
