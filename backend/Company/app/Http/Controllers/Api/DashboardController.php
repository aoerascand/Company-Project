<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'total_employees' => Employee::count(),
        ]);
    }
}
