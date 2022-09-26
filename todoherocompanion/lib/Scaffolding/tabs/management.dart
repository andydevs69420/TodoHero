import 'dart:developer';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';
import 'package:todoherocompanion/components/input.dart';
import 'package:todoherocompanion/components/management_tile.dart';
import 'package:todoherocompanion/components/textarea.dart';
import 'package:todoherocompanion/state/shared_state.dart';


class Management extends StatefulWidget {
  final SigninCubit cubit;
  final TodoHeroBloc bloc;
  const Management({super.key, required this.bloc, required this.cubit});

  @override
  State<Management> createState() => _ManagementState();
}

class _ManagementState extends State<Management> {
  String filter = "";

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.only(top: 15, left: 15, right: 15),
        child: Stack(
          children: [
            Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Material(
                elevation: 6,
                shadowColor: Colors.grey.withOpacity(.4),
                borderRadius: BorderRadius.circular(6),
                child: Input(
                  borderRadius: 6,
                  borderColor: Colors.transparent,
                  icon: Icons.search,
                  placeholder: "search todo",
                  onChange: (value) {
                    setState(() {
                      filter = value;
                    });
                  },
                ),
              ),
              const SizedBox(height: 10),
              Expanded(
                child: BlocConsumer<TodoHeroBloc, Map>(
                  listener: (context, state) {
                    log(state.toString());
                  },
                  builder: (context, state) {
                    return ListView.builder(
                      itemCount: state["todos"].length,
                      itemBuilder: (context, index) 
                      {
                        Map current = state["todos"][index];

                        if (current["title"].toString().startsWith(filter) || filter.isEmpty)
                        {
                          return ManagementTile(
                            title: current["title"],
                            description: current["description"],
                            date: current["date"],
                            time: current["time"],
                            onTap: () {
                              Navigator.of(context).push(MaterialPageRoute(builder: (context) => TodoView(
                                mode: MODE.update,
                                title: current["title"],
                                descr: current["description"],
                                date: current["date"],
                                time: current["time"],
                              )));
                            },
                          );
                        }

                        return const SizedBox();
                      },
                    );
                  },
                ),
              ),
            ],
          ),
          Align(
            alignment: Alignment.bottomRight,
            child: Padding(
              padding: const EdgeInsets.only(bottom: 15),
              child: FloatingActionButton.small(
                backgroundColor: const Color(0xFFA18635),
                onPressed: () async {
                  var result = await Navigator.of(context).push(MaterialPageRoute(builder: (context) => const TodoView(
                    mode: MODE.insert,
                  )));

                  result = (result == null)?false:result;

                  if (!result)
                  { return; }

                  widget.bloc.add(LoadTodo(userID: widget.cubit.ID));

                },
                child: const Icon(Icons.create),
              ),
            ),
          )
        ]
      )
    );
  }

  @override
  void dispose() {
    super.dispose();
  }
}




enum MODE {
  insert,
  update
}


class TodoView extends StatefulWidget {

  final Enum mode;
  final String title;
  final String descr;
  final String date;
  final String time;
  
  const TodoView({
    super.key, 
    this.mode=MODE.insert,
    this.title="",
    this.descr="",
    this.date="",
    this.time="",
  });

  @override
  State<TodoView> createState() => _TodoViewState();
}

class _TodoViewState extends State<TodoView> {
  var formKey = GlobalKey<FormState>();
  TextEditingController? titleCtrl = TextEditingController();
  TextEditingController? descrCtrl = TextEditingController();

  @override
  void initState() {

    if (widget.mode == MODE.update)
    {
      titleCtrl?.text = widget.title;
      descrCtrl?.text = widget.descr;
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    const double padd = 8;

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            (widget.mode == MODE.insert)?"New Todo":"Update Todo",
            style: const TextStyle(
              fontWeight: FontWeight.w200,
              fontSize: 18,
            ),
          ),
        ),
        floatingActionButton: (widget.mode == MODE.update)?
        Column(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            // update button
            FloatingActionButton.small(
              heroTag: "update",
              child: const Icon(Icons.edit),
              onPressed: () {
                
              },
            ),
            const SizedBox(height: padd),
            // delete
            FloatingActionButton.small(
              heroTag: "delete",
              child: const Icon(Icons.delete),
              onPressed: () {
                
              },
            )
          ],
        ):
        // insert button
        FloatingActionButton.small(
          child: const Icon(Icons.add),
          onPressed: () {

            if (formKey.currentState!.validate())
            {

            }

          },
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(15),
            child: Form(
              key: formKey,
              child: Column(
                children: [


                  //////////////////// EMAIL FIELD ///////////////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: padd, bottom: padd),
                    child: Input(
                      controller: titleCtrl,
                      icon: Icons.create,
                      placeholder: "Title",
                      validator: (value) {
                        if (value!.isEmpty)
                        { return "title field is required*"; }

                        return null;
                      },
                    ),
                  ),
                  ///////////


                  /////////////////// DESCRIPTION FIELD ///////////
                  Padding(
                    padding: const EdgeInsets.only(top: padd, bottom: padd),
                    child: TextArea(
                      controller: descrCtrl,
                      placeholder: "Description",
                      lines: 5,
                      validator: (value) {
                        if (value!.isEmpty)
                        { return "description field is required*"; }

                        return null;
                      },
                    ),
                  ),
                  //////////
                  
                  
                  //////////////////////// DATE AND TIME //////////////////
                  Padding(
                    padding: const EdgeInsets.only(top: padd, bottom: padd),
                    child: Row(
                      verticalDirection: VerticalDirection.up,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      mainAxisSize: MainAxisSize.max,
                      children: [

                        ElevatedButton(
                          child: Padding(
                            padding: const EdgeInsets.all(5),
                            child: Row(
                              children: const [
                                Icon(Icons.calendar_today),
                                SizedBox(width: padd),
                                Text("Date")
                              ],
                            ),
                          ),
                          onPressed: () async {
                            DateTime minDate = (widget.mode == MODE.update)?DateTime.parse(widget.date):DateTime.now();
                            DateTime? date = await showDatePicker(
                              context: context,
                              initialDate: minDate,
                              firstDate: minDate,
                              lastDate: DateTime.now().add(const Duration(days: 31))
                            );

                            if (date == null)
                            { return; }
                            
                            

                          },
                        ),

                        ElevatedButton(
                          child: Padding(
                            padding: const EdgeInsets.all(5),
                            child: Row(
                              children: const [
                                Icon(Icons.watch),
                                SizedBox(width: padd),
                                Text("Time")
                              ],
                            ),
                          ),
                          onPressed: () async {
                            TimeOfDay defTime = (widget.mode == MODE.update)?TimeOfDay.fromDateTime(DateTime.parse("${widget.date} ${widget.time}")):TimeOfDay.now();
                            TimeOfDay? time = await showTimePicker(
                              context: context,
                              initialTime: defTime,
                            );

                            if (time == null)
                            { return; }
    
                          },
                        ),

                      ],
                    ),
                  )
                  ///////////

                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}


