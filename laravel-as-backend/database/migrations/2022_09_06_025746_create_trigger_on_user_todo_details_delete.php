<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /** cascade does not work! */
        DB::unprepared("
            CREATE TRIGGER `on_user_todo_details_delete` AFTER DELETE ON `user_todo_details`
            FOR EACH ROW DELETE FROM todo WHERE todo_id = old.todo_id_fk
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared("
            DROP TRIGGER on_user_todo_details_delete;
        ");
    }
};
