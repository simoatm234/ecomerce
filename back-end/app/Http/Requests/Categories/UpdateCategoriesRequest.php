<?php

namespace App\Http\Requests\Categories;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Category;

class UpdateCategoriesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Resolve the category ID regardless of route parameter name
     * or whether implicit model binding is used.
     */
    protected function categoryId(): ?int
    {
        $param = $this->route('category') ?? $this->route('id');

        if ($param instanceof Category) {
            return $param->id;
        }

        return $param; // raw id (string/int) or null
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        $categoryId = $this->categoryId();

        return [
            'name' => [
                'nullable',
                'string',
                'max:255',
                "unique:categories,name,{$categoryId},id",
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

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.unique' => 'A category with this name already exists.',
            'name.max' => 'Category name may not exceed 255 characters.',

            'description.max' => 'Description may not exceed 1000 characters.',

            'image.file' => 'Please upload a valid file.',
            'image.image' => 'The uploaded file must be an image.',
            'image.mimes' => 'Only JPG, JPEG, PNG and WEBP images are allowed.',
            'image.max' => 'The image may not be larger than 2 MB.',

            'is_active.boolean' => 'Status must be true or false.',
        ];
    }

    /**
     * Custom attribute names.
     */
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
