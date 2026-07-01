<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class UserService
{
    public function list(array $filters = []): LengthAwarePaginator
    {
        return User::query()
            ->when($filters['search'] ?? null, function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($filters['role'] ?? null, fn ($query, string $role) => $query->where('role', $role))
            ->latest()
            ->paginate($filters['per_page'] ?? 15);
    }

    public function create(array $data): User
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

    public function update(User $user, array $data): User
    {
        if (! empty($data['password'])) {
            $user->password = $data['password'];
        }

        $user->fill(collect($data)->except(['password'])->all());

        $user->save();

        return $user->fresh();
    }

    public function delete(User $user): void
    {
        $user->tokens()->delete();
        $user->delete();
    }
}
