<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest\AuthRequests;
use App\Http\Requests\AuthRequest\LoginRequest;
use App\Http\Requests\AuthRequest\RegistrationRequest;
use Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(RegistrationRequest $request) {
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

        public function login(LoginRequest $request) {
            $credentials = $request->only(['email', 'password']);
            $user = User::where('email', $credentials['email'])->first();

            if ($user && Hash::check($credentials['password'], $user->password)) {
                $accessToken = $user->createToken('authToken')->plainTextToken;
                return response()->json([
                    "status" => true,
                    "message" => "Welcome back, {$user->username}!",
                    "user" => [
                        "username" => $user->username,
                        "email" => $user->email
                    ],
                    "token" => $accessToken
                ]);
            }

            return response()->json([
                "status" => false,
                "message" => "Invalid credentials."
            ], 401);
        }

        public function delete($id) {
            $user = User::find($id);
            if($user) {
                $user->delete();
                return response()->json([
                    "status" => true,
                    "message" => "User deleted successfully"
                ]);
            }

            return response()->json([
                "status" => false,
                "message" => "User with ID {$id} not found"
            ]);
        }

        public function list() {
            $users = User::paginate()->all();
            return response()->json([
                "status" => true,
                "user" => $users
            ]);
        }
}
