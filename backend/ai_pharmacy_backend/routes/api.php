<?php

// routes/api.php
use App\Http\Controllers\AuthController\UserController;
use App\Http\Controllers\Medicine\MedicineController;
use App\Http\Controllers\Supplier\SupplierController;
use Illuminate\Support\Facades\Route;



//Auth Routes
Route::post('/user/register', [UserController::class, 'register']);
Route::post('/user/login', [UserController::class, 'login']);

//User Routes
Route::delete('/user/delete/{id}', [UserController::class, 'delete']);
Route::get('/user/list', [UserController::class, 'list']);

//Medicine & supplier Routes
Route::apiResource('suppliers', SupplierController::class);
Route::apiResource('medicines', MedicineController::class);

