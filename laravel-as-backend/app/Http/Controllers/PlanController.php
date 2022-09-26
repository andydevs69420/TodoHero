<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plan;

class PlanController extends Controller
{
    /**
     * Fetch plan list
     * uses: GET method
     * @param $request Request
     * @return JSONString
     **/
    public function fetchPlanList(Request $request)
    { return response(json_encode(Plan::get(), JSON_PRETTY_PRINT)); }


}
