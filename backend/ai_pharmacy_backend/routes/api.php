<?php

// routes/api.php
use App\Http\Controllers\AuthController\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/user/register', [UserController::class, 'register']);
Route::post('/user/login', [UserController::class, 'login']);
Route::delete('/user/delete/{id}', [UserController::class, 'delete']);