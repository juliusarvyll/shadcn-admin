<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\Supplier;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $purchaseOrders = PurchaseOrder::with(['supplier'])
            ->withCount('items')
            ->withSum('items', 'total_cost')
            ->orderBy('order_date', 'desc')
            ->get();

        return Inertia::render('Inventory/PurchaseOrders/index', [
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        $products = Product::where('is_active', true)
            ->with(['category', 'supplier'])
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'barcode', 'cost_price', 'supplier_id']);

        return Inertia::render('Inventory/PurchaseOrders/create', [
            'suppliers' => $suppliers,
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'po_number' => 'required|string|max:100|unique:purchase_orders,po_number',
            'supplier_id' => 'required|exists:suppliers,id',
            'order_date' => 'required|date',
            'expected_delivery_date' => 'required|date|after:order_date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'status' => 'required|string|in:draft,pending,approved,ordered,received,cancelled',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_cost' => 'required|numeric|min:0',
            'items.*.total_cost' => 'required|numeric|min:0',
            'items.*.notes' => 'nullable|string',
        ]);

        // Generate PO number if not provided
        if (empty($validated['po_number'])) {
            $validated['po_number'] = $this->generatePONumber();
        }

        // Ensure PO number is unique
        $basePONumber = $validated['po_number'];
        $counter = 1;
        while (PurchaseOrder::where('po_number', $validated['po_number'])->exists()) {
            $validated['po_number'] = $basePONumber . '-' . $counter;
            $counter++;
        }

        // Create purchase order
        $purchaseOrder = PurchaseOrder::create($validated);

        // Create purchase order items
        foreach ($validated['items'] as $item) {
            $purchaseOrder->items()->create($item);
        }

        return redirect()->route('inventory.purchase-orders.index')
            ->with('success', 'Purchase order created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->load([
            'supplier',
            'items' => function ($query) {
                $query->with(['product', 'product.category']);
            }
        ]);

        $purchaseOrder->loadCount('items');
        $purchaseOrder->loadSum('items', 'total_cost');

        return Inertia::render('Inventory/PurchaseOrders/show', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PurchaseOrder $purchaseOrder)
    {
        $suppliers = Supplier::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);

        $products = Product::where('is_active', true)
            ->with(['category', 'supplier'])
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'barcode', 'cost_price', 'supplier_id']);

        $purchaseOrder->load('items');

        return Inertia::render('Inventory/PurchaseOrders/edit', [
            'purchaseOrder' => $purchaseOrder,
            'suppliers' => $suppliers,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'po_number' => 'required|string|max:100|unique:purchase_orders,po_number,' . $purchaseOrder->id,
            'supplier_id' => 'required|exists:suppliers,id',
            'order_date' => 'required|date',
            'expected_delivery_date' => 'required|date|after:order_date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'status' => 'required|string|in:draft,pending,approved,ordered,received,cancelled',
            'subtotal' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'shipping_amount' => 'required|numeric|min:0',
            'total_amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_cost' => 'required|numeric|min:0',
            'items.*.total_cost' => 'required|numeric|min:0',
            'items.*.notes' => 'nullable|string',
        ]);

        // Ensure PO number is unique (excluding current PO)
        $basePONumber = $validated['po_number'];
        $counter = 1;
        while (PurchaseOrder::where('po_number', $validated['po_number'])
            ->where('id', '!=', $purchaseOrder->id)
            ->exists()) {
            $validated['po_number'] = $basePONumber . '-' . $counter;
            $counter++;
        }

        // Update purchase order
        $purchaseOrder->update($validated);

        // Update purchase order items
        $purchaseOrder->items()->delete();
        foreach ($validated['items'] as $item) {
            $purchaseOrder->items()->create($item);
        }

        return redirect()->route('inventory.purchase-orders.index')
            ->with('success', 'Purchase order updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseOrder $purchaseOrder)
    {
        // Check if PO has been received
        if ($purchaseOrder->status === 'received') {
            return back()->with('error', 'Cannot delete a received purchase order.');
        }

        // Check if PO has transactions
        if ($purchaseOrder->inventoryTransactions()->exists()) {
            return back()->with('error', 'Cannot delete purchase order with existing transactions.');
        }

        $purchaseOrder->items()->delete();
        $purchaseOrder->delete();

        return redirect()->route('inventory.purchase-orders.index')
            ->with('success', 'Purchase order deleted successfully.');
    }

    /**
     * Update purchase order status
     */
    public function updateStatus(Request $request, PurchaseOrder $purchaseOrder)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:draft,pending,approved,ordered,received,cancelled',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
        ]);

        $purchaseOrder->update($validated);

        return back()->with('success', 'Purchase order status updated successfully.');
    }

    /**
     * Receive purchase order items
     */
    public function receive(PurchaseOrder $purchaseOrder)
    {
        if ($purchaseOrder->status !== 'ordered') {
            return back()->with('error', 'Only ordered purchase orders can be received.');
        }

        // Update PO status
        $purchaseOrder->update([
            'status' => 'received',
            'delivery_date' => now(),
        ]);

        // Create inventory transactions for received items
        foreach ($purchaseOrder->items as $item) {
            // Create stock in transaction
            $purchaseOrder->inventoryTransactions()->create([
                'product_id' => $item->product_id,
                'location_id' => $purchaseOrder->default_location_id ?? 1, // Default location
                'transaction_type' => 'in',
                'quantity' => $item->quantity,
                'unit_cost' => $item->unit_cost,
                'total_cost' => $item->total_cost,
                'reference_type' => 'purchase_order',
                'reference_id' => $purchaseOrder->id,
                'reference_number' => $purchaseOrder->po_number,
                'notes' => "Received from PO: {$purchaseOrder->po_number}",
                'transaction_date' => now(),
                'user_id' => auth()->id(),
            ]);

            // Update inventory item
            $inventoryItem = $item->product->inventoryItems()
                ->where('location_id', $purchaseOrder->default_location_id ?? 1)
                ->first();

            if ($inventoryItem) {
                $inventoryItem->increment('quantity', $item->quantity);
            } else {
                $item->product->inventoryItems()->create([
                    'location_id' => $purchaseOrder->default_location_id ?? 1,
                    'quantity' => $item->quantity,
                    'unit_cost' => $item->unit_cost,
                ]);
            }
        }

        return back()->with('success', 'Purchase order received successfully.');
    }

    /**
     * Get purchase orders for select dropdowns
     */
    public function getPurchaseOrders()
    {
        $purchaseOrders = PurchaseOrder::where('status', '!=', 'cancelled')
            ->orderBy('order_date', 'desc')
            ->get(['id', 'po_number', 'supplier_id', 'status']);

        return response()->json($purchaseOrders);
    }

    /**
     * Generate PO number
     */
    private function generatePONumber()
    {
        $prefix = 'PO';
        $year = date('Y');
        $month = date('m');

        // Get the last PO number for this year/month
        $lastPO = PurchaseOrder::where('po_number', 'like', "{$prefix}{$year}{$month}%")
            ->orderBy('po_number', 'desc')
            ->first();

        if ($lastPO) {
            $lastNumber = (int) substr($lastPO->po_number, -4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return $prefix . $year . $month . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
}
