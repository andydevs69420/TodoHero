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
       Db::unprepared("
            CREATE EVENT on_plan_expire_event ON SCHEDULE EVERY 1 MINUTE DO
            UPDATE user_plan_details SET user_plan_details.plan_status_id_fk = 1
                        WHERE (month(user_plan_details.date_validated) < month(CURRENT_DATE)) and
                                ( year(user_plan_details.date_validated) = year (CURRENT_DATE));
       ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_check_subscription_event');
    }
};
