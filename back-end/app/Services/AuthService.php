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
        $data['password'] = Hash::make($data['password']);

        $user = $this->createUser($data);

        return $this->issueToken($user, $user->role . '-auth-token');
    }

    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        return $this->issueToken($user, $user->role . '-auth-token');
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()?->delete();
    }

    private function createUser(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'],
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
        ]);
    }

    private function issueToken(User $user, string $tokenName): array
    {
        return [
            'user' => $user->fresh(),
            'token' => $user->createToken(
                $tokenName,
                ['*'],
                now()->addMinutes(config('sanctum.expiration'))
            )->plainTextToken,
        ];
    }
}
