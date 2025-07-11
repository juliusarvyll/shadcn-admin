<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['category', 'supplier'])
            ->withSum('inventoryItems', 'quantity')
            ->withCount('inventoryItems')
            ->orderBy('name')
            ->get();

        return Inertia::render('Inventory/Products/index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Inventory/Products/Create', [
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku',
            'barcode' => 'nullable|string|max:100|unique:products,barcode',
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:100',
            'size' => 'nullable|string|max:100',
            'weight_unit' => 'required|string|in:kg,g,lb,oz',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|string|max:255',
            'image' => 'nullable|url|max:255',
            'images' => 'nullable|string', // JSON array
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'wholesale_price' => 'nullable|numeric|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'nullable|integer|min:0',
            'unit_of_measure' => 'required|string|max:50',
            'is_active' => 'boolean',
            'is_trackable' => 'boolean',
            'requires_serial_number' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        // Handle images JSON array
        if (!empty($validated['images'])) {
            $images = json_decode($validated['images'], true);
            if (is_array($images)) {
                $validated['images'] = $images;
            } else {
                $validated['images'] = null;
            }
        } else {
            $validated['images'] = null;
        }

        // Generate SKU if not provided
        if (empty($validated['sku'])) {
            $validated['sku'] = $this->generateSKU($validated['name']);
        }

        // Ensure SKU is unique
        $baseSKU = $validated['sku'];
        $counter = 1;
        while (Product::where('sku', $validated['sku'])->exists()) {
            $validated['sku'] = $baseSKU . '-' . $counter;
            $counter++;
        }

        Product::create($validated);

        return redirect()->route('inventory.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load([
            'category',
            'supplier',
            'inventoryItems' => function ($query) {
                $query->with('location');
            },
            'inventoryTransactions' => function ($query) {
                $query->with(['location', 'user'])
                    ->orderBy('transaction_date', 'desc')
                    ->limit(10);
            }
        ]);

        $product->loadCount('inventoryItems');
        $product->loadSum('inventoryItems', 'quantity');

        return Inertia::render('Inventory/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Inventory/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku,' . $product->id,
            'barcode' => 'nullable|string|max:100|unique:products,barcode,' . $product->id,
            'description' => 'nullable|string',
            'category_id' => 'nullable|exists:categories,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'brand' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:100',
            'size' => 'nullable|string|max:100',
            'weight_unit' => 'required|string|in:kg,g,lb,oz',
            'weight' => 'nullable|numeric|min:0',
            'dimensions' => 'nullable|string|max:255',
            'image' => 'nullable|url|max:255',
            'images' => 'nullable|string', // JSON array
            'cost_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'wholesale_price' => 'nullable|numeric|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'nullable|integer|min:0',
            'unit_of_measure' => 'required|string|max:50',
            'is_active' => 'boolean',
            'is_trackable' => 'boolean',
            'requires_serial_number' => 'boolean',
            'notes' => 'nullable|string',
        ]);

        // Handle images JSON array
        if (!empty($validated['images'])) {
            $images = json_decode($validated['images'], true);
            if (is_array($images)) {
                $validated['images'] = $images;
            } else {
                $validated['images'] = null;
            }
        } else {
            $validated['images'] = null;
        }

        // Ensure SKU is unique (excluding current product)
        $baseSKU = $validated['sku'];
        $counter = 1;
        while (Product::where('sku', $validated['sku'])
            ->where('id', '!=', $product->id)
            ->exists()) {
            $validated['sku'] = $baseSKU . '-' . $counter;
            $counter++;
        }

        $product->update($validated);

        return redirect()->route('inventory.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Check if product has inventory items
        if ($product->inventoryItems()->exists()) {
            return back()->with('error', 'Cannot delete product with existing inventory items.');
        }

        // Check if product has transactions
        if ($product->inventoryTransactions()->exists()) {
            return back()->with('error', 'Cannot delete product with existing transactions.');
        }

        $product->delete();

        return redirect()->route('inventory.products.index')
            ->with('success', 'Product deleted successfully.');
    }

    /**
     * Search products by barcode or SKU
     */
    public function search(Request $request)
    {
        $query = $request->get('q');

        if (empty($query)) {
            return response()->json([]);
        }

        $products = Product::where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('sku', 'like', "%{$query}%")
                  ->orWhere('barcode', 'like', "%{$query}%");
            })
            ->with(['category', 'supplier'])
            ->withSum('inventoryItems', 'quantity')
            ->limit(10)
            ->get();

        return response()->json($products);
    }

    /**
     * Get product by barcode
     */
    public function getByBarcode($barcode)
    {
        $product = Product::where('barcode', $barcode)
            ->where('is_active', true)
            ->with(['category', 'supplier'])
            ->withSum('inventoryItems', 'quantity')
            ->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    /**
     * Generate SKU from product name
     */
    private function generateSKU($name)
    {
        $sku = strtoupper(preg_replace('/[^A-Z0-9]/', '', $name));
        return substr($sku, 0, 8) . str_pad('', 8 - strlen($sku), '0');
    }
}
