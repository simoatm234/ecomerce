<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function __construct(private readonly UserService $userService)
    {
    }

    public function show(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }

    public function update(Request $request): JsonResponse
    {
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
    }

    public function destroy(Request $request): JsonResponse
    {
        $this->userService->delete($request->user());

        return response()->json(['message' => 'Profile deleted successfully.']);
    }
}
