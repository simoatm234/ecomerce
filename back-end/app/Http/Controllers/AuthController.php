<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            $result = $this->authService->registerCustomer($data);

            return response()->json([
                'message' => 'Customer registered successfully.',
                'user' => $result['user'],
                'token' => $result['token'],
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (QueryException $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Database error occurred.',
            ], 500);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'An unexpected error occurred.',
            ], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            $result = $this->authService->login($data['email'], $data['password']);

            return response()->json([
                'message' => 'Logged in successfully.',
                'user' => $result['user'],
                'token' => $result['token'],
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => $e->getMessage() ?: 'Login failed.',
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function me(Request $request): JsonResponse
    {
        try {
            return response()->json(['user' => $request->user()]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authService->logout($request->user());

            return response()->json(['message' => 'Logged out successfully.']);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Logout failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
