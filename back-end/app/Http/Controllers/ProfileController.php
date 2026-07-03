<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;

class ProfileController extends Controller
{
    public function __construct(private readonly UserService $userService) {}

    public function show(Request $request): JsonResponse
    {
        try {
            return response()->json(['user' => $request->user()]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch profile.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            $data = $request->validate([
                'name' => ['sometimes', 'string', 'max:255'],
                'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
                'password' => ['sometimes', 'nullable', 'string', 'min:8'],
                'phone' => ['nullable', 'string', 'max:30'],
                'address' => ['nullable', 'string', 'max:1000'],
            ]);

            return response()->json([
                'message' => 'Profile updated successfully.',
                'user' => $this->userService->update($user, $data),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Database error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to update profile.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Request $request): JsonResponse
    {
        try {
            $this->userService->delete($request->user());

            return response()->json(['message' => 'Profile deleted successfully.']);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to delete profile.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
