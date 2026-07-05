<?php

namespace App\Http\Controllers;

use App\Http\Requests\Categories\StoreCategoriesRequest;
use App\Http\Requests\Categories\UpdateCategoriesRequest;
use App\Models\Category;
use App\Services\CategorieService;
use Illuminate\Http\Request;
use Exception;

class CategoriesController extends Controller
{
    public function __construct(
        private readonly CategorieService $categorie_service
    ) {}

    /**
     * Display all categories.
     */
    public function index()
    {
        try {
            $categories = $this->categorie_service->getAllCategories();

            return response()->json([
                'success' => true,
                'data' => $categories,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created category.
     */
    public function store(StoreCategoriesRequest $request)
    {
        try {
            $validated = $request->validated();

            $category = $this->categorie_service->createCategory($validated);

            return response()->json([
                'success' => true,
                'message' => 'Category created successfully.',
                'data' => $category,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified category.
     */
    public function show(Category $category)
    {
        try {
            return response()->json([
                'success' => true,
                'data' => $category,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified category.
     */
    public function update(UpdateCategoriesRequest $request, Category $category)
    {
        try {
            $validated = $request->validated();

            $category = $this->categorie_service->updateCategory($category, $validated);

            return response()->json([
                'success' => true,
                'message' => 'Category updated successfully.',
                'data' => $category,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified category.
     */
    public function destroy(Category $category)
    {
        try {
            $this->categorie_service->deleteCategory($category);

            return response()->json([
                'success' => true,
                'message' => 'Category deleted successfully.',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
