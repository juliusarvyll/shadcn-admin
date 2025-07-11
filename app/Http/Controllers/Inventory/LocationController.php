<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = InventoryLocation::with(['parent', 'children'])
            ->withCount(['inventoryItems', 'children'])
            ->withSum('inventoryItems', 'quantity')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Inventory/Locations/index', [
            'locations' => $locations,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $locations = InventoryLocation::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'type']);

        return Inertia::render('Inventory/Locations/create', [
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:inventory_locations,code',
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:inventory_locations,id',
            'type' => 'required|string|in:warehouse,shelf,bin,aisle,section,room',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'capacity' => 'nullable|numeric|min:0',
            'capacity_unit' => 'required|string|in:items,boxes,pallets,cubic_meters,square_meters,kg',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Generate code if not provided
        if (empty($validated['code'])) {
            $validated['code'] = $this->generateCode($validated['name'], $validated['type']);
        }

        // Ensure code is unique
        $baseCode = $validated['code'];
        $counter = 1;
        while (InventoryLocation::where('code', $validated['code'])->exists()) {
            $validated['code'] = $baseCode . '-' . $counter;
            $counter++;
        }

        // If this is set as default, unset other defaults
        if ($validated['is_default']) {
            InventoryLocation::where('is_default', true)->update(['is_default' => false]);
        }

        InventoryLocation::create($validated);

        return redirect()->route('inventory.locations.index')
            ->with('success', 'Location created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryLocation $location)
    {
        $location->load([
            'parent',
            'children' => function ($query) {
                $query->withCount('inventoryItems');
            },
            'inventoryItems' => function ($query) {
                $query->with(['product', 'product.category']);
            }
        ]);

        $location->loadCount(['inventoryItems', 'children']);
        $location->loadSum('inventoryItems', 'quantity');

        return Inertia::render('Inventory/Locations/show', [
            'location' => $location,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryLocation $location)
    {
        $locations = InventoryLocation::where('id', '!=', $location->id)
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'type']);

        return Inertia::render('Inventory/Locations/edit', [
            'location' => $location,
            'locations' => $locations,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryLocation $location)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:inventory_locations,code,' . $location->id,
            'description' => 'nullable|string',
            'parent_id' => [
                'nullable',
                'exists:inventory_locations,id',
                function ($attribute, $value, $fail) use ($location) {
                    if ($value == $location->id) {
                        $fail('A location cannot be its own parent.');
                    }
                },
            ],
            'type' => 'required|string|in:warehouse,shelf,bin,aisle,section,room',
            'address' => 'nullable|string',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:100',
            'contact_person' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255',
            'capacity' => 'nullable|numeric|min:0',
            'capacity_unit' => 'required|string|in:items,boxes,pallets,cubic_meters,square_meters,kg',
            'is_active' => 'boolean',
            'is_default' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Ensure code is unique (excluding current location)
        $baseCode = $validated['code'];
        $counter = 1;
        while (InventoryLocation::where('code', $validated['code'])
            ->where('id', '!=', $location->id)
            ->exists()) {
            $validated['code'] = $baseCode . '-' . $counter;
            $counter++;
        }

        // If this is set as default, unset other defaults
        if ($validated['is_default']) {
            InventoryLocation::where('is_default', true)
                ->where('id', '!=', $location->id)
                ->update(['is_default' => false]);
        }

        $location->update($validated);

        return redirect()->route('inventory.locations.index')
            ->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryLocation $location)
    {
        // Check if location has inventory items
        if ($location->inventoryItems()->exists()) {
            return back()->with('error', 'Cannot delete location with existing inventory items.');
        }

        // Check if location has children
        if ($location->children()->exists()) {
            return back()->with('error', 'Cannot delete location with sub-locations.');
        }

        // Check if location has transactions
        if ($location->inventoryTransactions()->exists()) {
            return back()->with('error', 'Cannot delete location with existing transactions.');
        }

        $location->delete();

        return redirect()->route('inventory.locations.index')
            ->with('success', 'Location deleted successfully.');
    }

    /**
     * Get locations for select dropdowns
     */
    public function getLocations()
    {
        $locations = InventoryLocation::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code', 'type']);

        return response()->json($locations);
    }

    /**
     * Get default location
     */
    public function getDefaultLocation()
    {
        $location = InventoryLocation::where('is_default', true)
            ->where('is_active', true)
            ->first();

        return response()->json($location);
    }

    /**
     * Search locations
     */
    public function search(Request $request)
    {
        $query = $request->get('q');

        if (empty($query)) {
            return response()->json([]);
        }

        $locations = InventoryLocation::where('is_active', true)
            ->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('code', 'like', "%{$query}%")
                  ->orWhere('type', 'like', "%{$query}%");
            })
            ->withCount('inventoryItems')
            ->limit(10)
            ->get();

        return response()->json($locations);
    }

    /**
     * Generate location code from name and type
     */
    private function generateCode($name, $type)
    {
        $typeCode = strtoupper(substr($type, 0, 3));
        $nameCode = strtoupper(preg_replace('/[^A-Z0-9]/', '', $name));
        $nameCode = substr($nameCode, 0, 4);
        return $typeCode . '-' . $nameCode;
    }
}
