<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function registerCustomer(array $data): array
    {
        $data['role'] = 'customer';

        return $this->createUser($data, 'customer-auth-token');
    }

    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->issueToken($user, $user->role.'-auth-token');
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()?->delete();
    }

    private function createUser(array $data, string $tokenName): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
        ]);

        return $this->issueToken($user, $tokenName);
    }

    private function issueToken(User $user, string $tokenName): array
    {
        return [
            'user' => $user->fresh(),
            'token' => $user->createToken($tokenName)->plainTextToken,
        ];
    }
}
