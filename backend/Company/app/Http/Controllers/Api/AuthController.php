<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(request $request)
    {
        $credentials = $request -> validate ([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        $user = request()->user();
        return response()->json([
            'token' => $user->createToken('api-token')->plainTextToken,
            'user' => $user,
        ]);
    }
}
