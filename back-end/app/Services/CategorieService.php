<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class CategorieService
{
    public function getAllCategories(int $perPage = 10)
    {
        return Category::withCount('products')
            ->latest()
            ->paginate($perPage);
    }

    public function createCategory(array $data): Category
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            $data['image_path'] = $data['image']->store('categories', 'public');
        }

        unset($data['image']);

        return Category::create($data);
    }

    public function updateCategory(Category $category, array $data): Category
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {

            if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
                Storage::disk('public')->delete($category->image_path);
            }

            $data['image_path'] = $data['image']->store('categories', 'public');
        }

        unset($data['image']);

        $category->update($data);

        return $category->fresh();
    }

    public function deleteCategory(Category $category): bool
    {
        if ($category->image_path && Storage::disk('public')->exists($category->image_path)) {
            Storage::disk('public')->delete($category->image_path);
        }

        return $category->delete();
    }
}
