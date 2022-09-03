<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


use App\Models\Plan;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan', function (Blueprint $table) {
            $table->id();
            $table->string("plan_name");
            $table->float("plan_price");
            $table->integer("number_of_todos");
        });



        Plan::create([
            "plan_name"  => "freemium",
            "plan_price" => 0.0,
            "number_of_todos" => 10
        ]);

        Plan::create([
            "plan_name"  => "pro",
            "plan_price" => 69.00,
            "number_of_todos" => 25
        ]);

        Plan::create([
            "plan_name"  => "plus",
            "plan_price" => 420.00,
            "number_of_todos" => 999
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan');
    }
};
