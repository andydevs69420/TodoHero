<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\PlanStatus;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("plan_status", function (Blueprint $table) {
            $table->id("plan_status_id");
            $table->string("plan_status_name");
        });

        PlanStatus::create([
            "plan_status_name" => "unpaid"
        ]);

        PlanStatus::create([
            "plan_status_name" => "paid"
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("plan_status");
    }
};
