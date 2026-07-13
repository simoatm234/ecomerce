<?php

namespace App\Http\Requests\user;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class update extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // ✅ was false — blocked every request
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        // Route parameter is {user} — matches your controller's User $user binding
        $userId = $this->route('user')?->id;

        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'password' => ['sometimes', 'nullable', 'string', 'min:8'],
            'role' => ['sometimes', 'in:customer,admin'],
            'phone' => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.string' => 'Name must be a valid string.',
            'name.max' => 'Name may not exceed 255 characters.',

            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Email may not exceed 255 characters.',
            'email.unique' => 'A user with this email already exists.',

            'password.min' => 'Password must be at least 8 characters.',

            'role.in' => 'Role must be either customer or admin.',

            'phone.max' => 'Phone number may not exceed 30 characters.',

            'address.max' => 'Address may not exceed 1000 characters.',
        ];
    }

    /**
     * Custom attribute names.
     */
    public function attributes(): array
    {
        return [
            'name' => 'full name',
            'email' => 'email address',
            'password' => 'password',
            'role' => 'role',
            'phone' => 'phone number',
            'address' => 'address',
        ];
    }
}
