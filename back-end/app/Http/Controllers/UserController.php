<?php

namespace App\Http\Controllers;

use App\Http\Requests\user\store;
use App\Http\Requests\user\update;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->validate([
                'role' => ['nullable', 'in:customer,admin'],
                'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            ]);

            $users = $this->userService->list($filters);

            return response()->json([
                'success' => true,
                'data' => $users,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch users.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(store $request): JsonResponse
    {
        try {
            $data = $request->validated();

            return response()->json([
                'message' => 'User created successfully.',
                'user' => $this->userService->create($data),
            ], 201);
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
                'message' => 'Failed to create user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function show(User $user): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $user,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(update $request, User $user): JsonResponse
    {
        try {
            $data = $request->validated();

            $updatedUser = $this->userService->update($user, $data);

            return response()->json([
                'message' => 'User updated successfully.',
                'data' => $updatedUser,
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
                'message' => 'Failed to update user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        try {
            if ($request->user()->is($user)) {
                return response()->json([
                    'message' => 'You cannot delete your own account.',
                ], 422);
            }

            $this->userService->delete($user);

            return response()->json(['message' => 'User deleted successfully.']);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to delete user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
