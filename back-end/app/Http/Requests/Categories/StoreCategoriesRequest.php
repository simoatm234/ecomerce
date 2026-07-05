<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoriesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:categories,name',
            ],

            'description' => [
                'nullable',
                'string',
                'max:1000',
            ],

            'image' => [
                'nullable',
                'file',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
            ],

            'is_active' => [
                'sometimes',
                'boolean',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required.',
            'name.unique' => 'This category already exists.',
            'name.max' => 'Category name cannot exceed 255 characters.',

            'description.max' => 'Description cannot exceed 1000 characters.',

            'image.image' => 'The uploaded file must be an image.',
            'image.file' => 'Please upload a valid file.',
            'image.mimes' => 'Only JPG, JPEG, PNG and WEBP images are allowed.',
            'image.max' => 'Image size cannot exceed 2 MB.',

            'is_active.boolean' => 'Status must be true or false.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'category name',
            'description' => 'description',
            'image' => 'image',
            'is_active' => 'status',
        ];
    }
}
