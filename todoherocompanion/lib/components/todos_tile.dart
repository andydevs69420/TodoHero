import 'dart:developer';

import 'package:flutter/material.dart';


class TodosTile extends StatefulWidget {
  final String title, createdDate, date, time;
  final Function onTap;

  const TodosTile({super.key,
      required this.title,
      required this.createdDate,
      required this.date,
      required this.time,
      required this.onTap});

  @override
  State<TodosTile> createState() => _TodosTileState();
}

class _TodosTileState extends State<TodosTile> {


  double getPercentageByDate(String createdAt, String schedule, String time)
  {
    int start, sched, now;
    start = DateTime.parse(createdAt).millisecondsSinceEpoch;
    sched = DateTime.parse("$schedule $time").millisecondsSinceEpoch;
    now   = DateTime.now().millisecondsSinceEpoch;

    double perc = ((now - start) / (sched - start)) * 100;
        perc = (perc > 100)? 100 : perc;
    return perc;
  }

  @override
  Widget build(BuildContext context) {
    
    double percentage = getPercentageByDate(widget.createdDate, widget.date, widget.time);
    Color? color;
   
    if (percentage <= 25.0) 
    { color = Colors.blueAccent;  }
    else if (percentage <= 50.0) 
    { color = Colors.amberAccent; }
    else if (percentage <= 75.0) 
    { color = Colors.red[300];    }
    else if (percentage <= 100.0)
    { color = Colors.redAccent;   }

    return GestureDetector(
      onTap: () => widget.onTap(),
      child: Padding(
        padding: const EdgeInsets.only(top: 2.5, bottom: 2.5),
        child: Material(
          elevation: 3,
          shadowColor: Colors.black.withAlpha(100),
          borderRadius: const BorderRadius.all(Radius.circular(3)),
          child: Container(
            decoration: const BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(3)),
                color: Colors.white),
            child: Padding(
              padding: const EdgeInsets.all(15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.title,
                    style: const TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  const SizedBox(height: 10),
                  LinearProgressIndicator(
                    color: color,
                    value: percentage / 100,
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Text(
                            "DATE: ",
                            style: TextStyle(fontSize: 10),
                          ),
                          Text(
                            widget.date,
                            style: const TextStyle(fontSize: 10),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          const Text(
                            "TIME: ",
                            style: TextStyle(fontSize: 10),
                          ),
                          Text(
                            widget.time,
                            style: const TextStyle(fontSize: 10),
                          ),
                        ],
                      )
                    ],
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}


