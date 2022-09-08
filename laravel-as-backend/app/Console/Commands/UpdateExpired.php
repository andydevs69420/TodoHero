<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;

class UpdateExpired extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "update:expired";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Command description";

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Db::unprepared("
            UPDATE user_plan_details SET user_plan_details.plan_status_id_fk = 1
            WHERE (month(user_plan_details.date_validated) < month(CURRENT_DATE)) and
                ( year(user_plan_details.date_validated) = year (CURRENT_DATE)) and
                (user_plan_details.plan_status_id_fk = 2 and user_plan_details.plan_id_fk != 1);
        ");
        return 0;
    }
}
