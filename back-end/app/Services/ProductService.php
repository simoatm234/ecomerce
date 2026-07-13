<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function list(array $filters = [])
    {
        $query = Product::query()->with('category');

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (array_key_exists('is_active', $filters) && $filters['is_active'] !== null) {
            $query->where('is_active', (bool) $filters['is_active']);
        }

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        $perPage = $filters['per_page'] ?? 10;

        return $query->latest()->paginate($perPage);
    }

    public function show(Product $product): Product
    {
        return $product->load('category');
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }
}
