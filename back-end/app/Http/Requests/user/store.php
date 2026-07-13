<?php

namespace App\Http\Requests\user;

use Illuminate\Foundation\Http\FormRequest;

class store extends FormRequest
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'in:customer,admin'],
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
            'name.required' => 'Please enter the user\'s full name.',
            'name.max' => 'Name may not exceed 255 characters.',

            'email.required' => 'Please enter an email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'Email may not exceed 255 characters.',
            'email.unique' => 'A user with this email already exists.',

            'password.required' => 'Please enter a password.',
            'password.min' => 'Password must be at least 8 characters.',

            'role.required' => 'Please select a role for this user.',
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
