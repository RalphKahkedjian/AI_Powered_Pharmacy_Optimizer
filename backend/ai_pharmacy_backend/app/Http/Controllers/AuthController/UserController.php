<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest\AuthRequests;
use Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(AuthRequests $request) {
        $user = new User();
        $user->username = $request->get('username');
        $user->email = $request->get('email');
        $user->password = Hash::make($request->get('password'));
        $user->age = $request->get('age');
        $user->save();

        $accessToken = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            "status" => true,
            "user" => [
                "username" => $user->username,
                "email" => $user->email,
                "age" => $user->age
            ],
        ]);
    }

    public function login(AuthRequests $request) {
        $credentials = $request->only(['email', 'password']);
        $user = User::where('email', $credentials['email'])->first();
        if($user && Hash::check($credentials['password'], $user->password)) {
            $accessToken = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                "status" => true,
                "message" => " Welcome back, {$user->username}!"
            ]);
        }
    }
}
