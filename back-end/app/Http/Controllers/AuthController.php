<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;
use Laravel\Socialite\Facades\Socialite;

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
    public function redirectToGoogle(): JsonResponse
    {
        try {
            $url = Socialite::driver('google')->stateless()->redirect()->getTargetUrl();

            return response()->json(['url' => $url]);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Unable to connect to Google.',
            ], 500);
        }
    }

    public function handleGoogleCallback(): \Illuminate\Http\RedirectResponse
    {
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:3000');

        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $result = $this->authService->loginWithGoogle(
                $googleUser->getId(),
                $googleUser->getName(),
                $googleUser->getEmail()
            );

            return redirect()->away(
                $frontendUrl . '/auth/google/callback?token=' . $result['token'] . '&role=' . $result['user']->role
            );
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return redirect()->away($frontendUrl . '/auth?error=google_failed');
        }
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $this->authService->sendResetLink($request->validated()['email']);

            return response()->json([
                'message' => 'Password reset link sent to your email.',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Unable to send reset link.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong. Please try again.',
            ], 500);
        }
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $this->authService->resetPassword($request->validated());

            return response()->json([
                'message' => 'Password reset successfully. You can now log in.',
            ] );
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Unable to reset password.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something went wrong. Please try again.',
            ], 500);
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
