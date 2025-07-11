<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::withCount('products')
            ->withSum('products', 'cost_price')
            ->orderBy('name')
            ->get();

        return Inertia::render('Inventory/Suppliers/index', [
            'suppliers' => $suppliers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Inventory/Suppliers/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:suppliers,code',
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'website' => 'nullable|url|max:255',
            'notes' => 'nullable|string',
            'payment_terms' => 'required|string|in:immediate,net_30,net_60,net_90,custom',
            'credit_limit' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        // Generate code if not provided
        if (empty($validated['code'])) {
            $validated['code'] = $this->generateCode($validated['name']);
        }

        // Ensure code is unique
        $baseCode = $validated['code'];
        $counter = 1;
        while (Supplier::where('code', $validated['code'])->exists()) {
            $validated['code'] = $baseCode . '-' . $counter;
            $counter++;
        }

        Supplier::create($validated);

        return redirect()->route('inventory.suppliers.index')
            ->with('success', 'Supplier created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        $supplier->load([
            'products' => function ($query) {
                $query->with(['category'])
                    ->withSum('inventoryItems', 'quantity');
            },
            'purchaseOrders' => function ($query) {
                $query->withCount('items')
                    ->orderBy('order_date', 'desc')
                    ->limit(10);
            }
        ]);

        $supplier->loadCount(['products', 'purchaseOrders']);
        $supplier->loadSum('products', 'cost_price');

        return Inertia::render('Inventory/Suppliers/show', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Inventory/Suppliers/edit', [
            'supplier' => $supplier,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Supplier $supplier)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:suppliers,code,' . $supplier->id,
            'contact_person' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'fax' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'website' => 'nullable|url|max:255',
            'notes' => 'nullable|string',
            'payment_terms' => 'required|string|in:immediate,net_30,net_60,net_90,custom',
            'credit_limit' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        // Ensure code is unique (excluding current supplier)
        $baseCode = $validated['code'];
        $counter = 1;
        while (Supplier::where('code', $validated['code'])
            ->where('id', '!=', $supplier->id)
            ->exists()) {
            $validated['code'] = $baseCode . '-' . $counter;
            $counter++;
        }

        $supplier->update($validated);

        return redirect()->route('inventory.suppliers.index')
            ->with('success', 'Supplier updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        // Check if supplier has products
        if ($supplier->products()->exists()) {
            return back()->with('error', 'Cannot delete supplier with associated products.');
        }

        // Check if supplier has purchase orders
        if ($supplier->purchaseOrders()->exists()) {
            return back()->with('error', 'Cannot delete supplier with existing purchase orders.');
        }

        $supplier->delete();

        return redirect()->route('inventory.suppliers.index')
            ->with('success', 'Supplier deleted successfully.');
    }

    /**
     * Get suppliers for select dropdowns
     */
    public function getSuppliers()
    {
        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        return response()->json($suppliers);
    }

    /**
     * Search suppliers
     */
    public function search(Request $request)
    {
        $query = $request->get('q');

        if (empty($query)) {
            return response()->json([]);
        }

        $suppliers = Supplier::where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('code', 'like', "%{$query}%")
                  ->orWhere('contact_person', 'like', "%{$query}%");
            })
            ->withCount('products')
            ->limit(10)
            ->get();

        return response()->json($suppliers);
    }

    /**
     * Generate supplier code from name
     */
    private function generateCode($name)
    {
        $code = strtoupper(preg_replace('/[^A-Z0-9]/', '', $name));
        return substr($code, 0, 6) . str_pad('', 6 - strlen($code), '0');
    }
}
