<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\CompanyProfileController;
use App\Http\Controllers\Api\ContactInfoController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\ContactMessageController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

Route::get('/company-profile', [CompanyProfileController::class, 'index']);
Route::get('/contact-info', [ContactInfoController::class, 'index']);
Route::get('/public/employees', [EmployeeController::class, 'index']);

Route::post('/contact-messages', [ContactMessageController::class, 'store']);

Route::get('/test', fn () => response()->json(['status' => 'API OK']));

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (ADMIN)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::get('/user', fn (Request $request) => $request->user());

    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    });

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Company Profile
    Route::post('/company-profile', [CompanyProfileController::class, 'store']);
    Route::put('/company-profile', [CompanyProfileController::class, 'update']);

    // Contact Info
    Route::put('/contact-info', [ContactInfoController::class, 'update']);

    // Employees
    Route::apiResource('employees', EmployeeController::class);

    // Contact Messages (ADMIN VIEW)
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::get('/contact-messages/{id}', [ContactMessageController::class, 'show']);
    Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);
});
