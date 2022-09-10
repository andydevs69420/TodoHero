
# TodoHero App
Simple todo organizer web application.


## COMPONENTS :fire:
- [X] ADMIN Page
- [x] TodoHero App
    - Todo List
    - Todo Manager
    - Plan Manager
    - Account Manager

- [x] Online Payment
    - Stripe Payment Gateway
- [x] Email Notification


## CHANGES
```php

    // OLD
    // $users = DB::table("user_todo_details")
    //     ->join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
    //     ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
    //     ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
    //     ->whereDay("todo.date", "<=", DB::Raw("DAY(CURRENT_DATE)"))
    //     ->whereTime("todo.time", "<", DB::Raw("TIME(CURRENT_TIME)"))
    //     ->get();

    // NEW
    $users = UserTodoDetails::join("user", "user_todo_details.user_id_fk", "=", "user.user_id")
        ->join("todo", "user_todo_details.todo_id_fk", "=", "todo.todo_id")
        ->whereMonth("todo.date", "<=", DB::Raw("MONTH(CURRENT_DATE)"))
        ->whereDay("todo.date"  , "<=", DB::Raw("CURRENT_DATE"))
        ->whereTime("todo.time" , "<" , DB::Raw("MONTH(CURRENT_TIME)"))
        ->get();

```


## SAMPLE IMAGES :camera:

- REGULAR VIEW
<p align="left">
    <img src="screenshots/signin_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/signup_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/todo_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/manage_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/manage_new_todo_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/manage_update_todo_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/plan_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/plan_upgrade_xl.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/account_xl.png" alt="md-to-xl and up" width="190px"/>
</p>
- SMALL DEVICES VIEW
<p align="left">
    <img src="screenshots/signin.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/signup.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/todo.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/todo_search.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/manage_search.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/manage_new_todo.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/plan_new.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/plan_upgrade.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/account.png" alt="md-to-xl and up" width="90px"/>
    <img src="screenshots/account_continue.png" alt="md-to-xl and up" width="90px"/>
</p>


## ADMIN PAGE
<p align="left">
    <img src="screenshots/admin_login.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/admin_main.png" alt="md-to-xl and up" width="190px"/>
    <img src="screenshots/admin_settings.png" alt="md-to-xl and up" width="190px"/>
</p>