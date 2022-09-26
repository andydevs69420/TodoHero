import 'package:flutter/material.dart';

class ManagementTile extends StatefulWidget {
  final String title, description, date, time;
  final Function onTap;
  const ManagementTile(
      {super.key,
      required this.title,
      required this.description,
      required this.date,
      required this.time,
      required this.onTap});

  @override
  State<ManagementTile> createState() => _ManagementTileState();
}

class _ManagementTileState extends State<ManagementTile> {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => widget.onTap(),
      child: Padding(
        padding: const EdgeInsets.only(top: 5, bottom: 5),
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
                  Text(
                    widget.description.substring(
                        0,
                        (widget.description.length > 40)
                            ? 40
                            : widget.description.length),
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w400,
                    ),
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
