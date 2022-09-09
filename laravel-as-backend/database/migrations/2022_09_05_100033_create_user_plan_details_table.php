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
        Schema::create("user_plan_details", function (Blueprint $table) {
            $table->id("user_plan_details_id");
            $table->bigInteger("user_id_fk")->unsigned();
            $table->bigInteger("plan_id_fk")->unsigned();
            $table->bigInteger("plan_status_id_fk")->unsigned();
            $table->date("date_validated");

            $table->foreign("user_id_fk")->references("user_id")->on("user")->onDelete("cascade");
            $table->foreign("plan_id_fk")->references("plan_id")->on("plan");
            $table->foreign("plan_status_id_fk")->references("plan_status_id")->on("plan_status");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("user_plan_details");
    }
};
