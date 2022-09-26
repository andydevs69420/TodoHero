<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("user_todo_details", function(Blueprint $table) {
            $table->id("user_todo_details_id");
            $table->bigInteger("user_id_fk")->unsigned();
            $table->bigInteger("todo_id_fk")->unsigned();

            $table->foreign("user_id_fk")->references("user_id")->on("user")->onDelete("cascade");
            $table->foreign("todo_id_fk")->references("todo_id")->on("todo")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("user_todo_details");
    }
};
