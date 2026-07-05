<?php

namespace App\Services;

use App\Mail\LoginAlertMail;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
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

        return $this->issueToken($user, $user->role . '-auth-token', notify: true);
    }

    public function loginWithGoogle(string $googleId, string $name, string $email): array
    {
        $user = User::where('google_id', $googleId)
            ->orWhere('email', $email)
            ->first();

        if (!$user) {
            $user = $this->createUser([
                'name' => $name,
                'email' => $email,
                'google_id' => $googleId,
                'password' => null,
                'role' => 'customer',
            ]);
        } elseif (!$user->google_id) {
            $user->update(['google_id' => $googleId]);
        }

        return $this->issueToken($user, $user->role . '-auth-token', notify: true);
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
            'password' => $data['password'] ?? null,
            'role' => $data['role'],
            'google_id' => $data['google_id'] ?? null,
            'phone' => $data['phone'] ?? null,
            'address' => $data['address'] ?? null,
        ]);
    }

  

    public function sendResetLink(string $email): void
    {
        $status = Password::sendResetLink(['email' => $email]);

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
    }

    public function resetPassword(array $data): void
    {
        $status = Password::reset(
            $data,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }
    }

    private function issueToken(User $user, string $tokenName, bool $notify = false): array
    {
        if ($notify) {
            Mail::to($user->email)->queue(new LoginAlertMail($user));
        }

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
