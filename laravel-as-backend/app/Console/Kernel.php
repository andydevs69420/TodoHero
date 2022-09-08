<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

use Illuminate\Support\Facades\DB;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();

        $schedule->call($this->markAsExpired)
            ->timezone("Asia/Manila")
            ->everyMinute();
    }

    protected function markAsExpired()
    {
        /** handles plan */
        /*
        | ONLY UPDATE EXPIRED PLAN SUBCRIPTION
        | plan_status_id_fk := 1-unpaid, 2-paid
        */
        Db::unprepared("
            UPDATE user_plan_details SET user_plan_details.plan_status_id_fk = 1
            WHERE (month(user_plan_details.date_validated) < month(CURRENT_DATE)) and
                ( year(user_plan_details.date_validated) = year (CURRENT_DATE)) and
                (user_plan_details.plan_status_id_fk = 2 and user_plan_details.plan_id_fk != 1);
        ");
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
