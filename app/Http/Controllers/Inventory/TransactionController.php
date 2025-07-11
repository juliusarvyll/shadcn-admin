<?php

namespace App\Http\Controllers\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryTransaction;
use App\Models\Product;
use App\Models\InventoryLocation;
use App\Models\PurchaseOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = InventoryTransaction::with(['product', 'location', 'user'])
            ->orderBy('transaction_date', 'desc')
            ->get();

        return Inertia::render('Inventory/Transactions/index', [
            'transactions' => $transactions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::where('is_active', true)
            ->with(['category', 'supplier'])
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'barcode', 'cost_price']);

        $locations = InventoryLocation::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code', 'type']);

        $purchaseOrders = PurchaseOrder::where('status', 'ordered')
            ->orderBy('order_date', 'desc')
            ->get(['id', 'po_number', 'supplier_id']);

        return Inertia::render('Inventory/Transactions/create', [
            'products' => $products,
            'locations' => $locations,
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'location_id' => 'required|exists:inventory_locations,id',
            'transaction_type' => 'required|string|in:in,out,transfer,adjustment,return,damage,expiry',
            'quantity' => 'required|integer|min:1',
            'unit_cost' => 'required|numeric|min:0',
            'total_cost' => 'required|numeric|min:0',
            'reference_type' => 'nullable|string|in:purchase_order,sales_order,manual,transfer,adjustment,return',
            'reference_id' => 'nullable|integer',
            'reference_number' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        // Calculate total cost if not provided
        if (empty($validated['total_cost'])) {
            $validated['total_cost'] = $validated['quantity'] * $validated['unit_cost'];
        }

        // Set user ID
        $validated['user_id'] = auth()->id();

        // Create transaction
        $transaction = InventoryTransaction::create($validated);

        // Update inventory item
        $this->updateInventoryItem($transaction);

        return redirect()->route('inventory.transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryTransaction $transaction)
    {
        $transaction->load(['product', 'location', 'user']);

        return Inertia::render('Inventory/Transactions/show', [
            'transaction' => $transaction,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryTransaction $transaction)
    {
        $products = Product::where('is_active', true)
            ->with(['category', 'supplier'])
            ->orderBy('name')
            ->get(['id', 'name', 'sku', 'barcode', 'cost_price']);

        $locations = InventoryLocation::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code', 'type']);

        $purchaseOrders = PurchaseOrder::where('status', 'ordered')
            ->orderBy('order_date', 'desc')
            ->get(['id', 'po_number', 'supplier_id']);

        return Inertia::render('Inventory/Transactions/edit', [
            'transaction' => $transaction,
            'products' => $products,
            'locations' => $locations,
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryTransaction $transaction)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'location_id' => 'required|exists:inventory_locations,id',
            'transaction_type' => 'required|string|in:in,out,transfer,adjustment,return,damage,expiry',
            'quantity' => 'required|integer|min:1',
            'unit_cost' => 'required|numeric|min:0',
            'total_cost' => 'required|numeric|min:0',
            'reference_type' => 'nullable|string|in:purchase_order,sales_order,manual,transfer,adjustment,return',
            'reference_id' => 'nullable|integer',
            'reference_number' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        // Calculate total cost if not provided
        if (empty($validated['total_cost'])) {
            $validated['total_cost'] = $validated['quantity'] * $validated['unit_cost'];
        }

        // Revert previous inventory changes
        $this->revertInventoryItem($transaction);

        // Update transaction
        $transaction->update($validated);

        // Apply new inventory changes
        $this->updateInventoryItem($transaction);

        return redirect()->route('inventory.transactions.index')
            ->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryTransaction $transaction)
    {
        // Revert inventory changes
        $this->revertInventoryItem($transaction);

        $transaction->delete();

        return redirect()->route('inventory.transactions.index')
            ->with('success', 'Transaction deleted successfully.');
    }

    /**
     * Get transaction history for a product
     */
    public function getProductHistory(Product $product)
    {
        $transactions = InventoryTransaction::where('product_id', $product->id)
            ->with(['location', 'user'])
            ->orderBy('transaction_date', 'desc')
            ->get();

        return response()->json($transactions);
    }

    /**
     * Get transaction history for a location
     */
    public function getLocationHistory(InventoryLocation $location)
    {
        $transactions = InventoryTransaction::where('location_id', $location->id)
            ->with(['product', 'user'])
            ->orderBy('transaction_date', 'desc')
            ->get();

        return response()->json($transactions);
    }

    /**
     * Get transaction summary
     */
    public function getSummary()
    {
        $summary = [
            'total_transactions' => InventoryTransaction::count(),
            'stock_in' => InventoryTransaction::where('transaction_type', 'in')->sum('quantity'),
            'stock_out' => InventoryTransaction::whereIn('transaction_type', ['out', 'damage', 'expiry'])->sum('quantity'),
            'total_value' => InventoryTransaction::sum('total_cost'),
            'recent_transactions' => InventoryTransaction::with(['product', 'location'])
                ->orderBy('transaction_date', 'desc')
                ->limit(10)
                ->get(),
        ];

        return response()->json($summary);
    }

    /**
     * Update inventory item based on transaction
     */
    private function updateInventoryItem(InventoryTransaction $transaction)
    {
        $product = $transaction->product;
        $location = $transaction->location;

        // Find or create inventory item
        $inventoryItem = $product->inventoryItems()
            ->where('location_id', $location->id)
            ->first();

        if (!$inventoryItem) {
            $inventoryItem = $product->inventoryItems()->create([
                'location_id' => $location->id,
                'quantity' => 0,
                'unit_cost' => $transaction->unit_cost,
            ]);
        }

        // Update quantity based on transaction type
        switch ($transaction->transaction_type) {
            case 'in':
            case 'return':
                $inventoryItem->increment('quantity', $transaction->quantity);
                break;
            case 'out':
            case 'damage':
            case 'expiry':
                $inventoryItem->decrement('quantity', $transaction->quantity);
                break;
            case 'transfer':
                // Handle transfer logic if needed
                break;
            case 'adjustment':
                // Set quantity directly
                $inventoryItem->update(['quantity' => $transaction->quantity]);
                break;
        }

        // Update unit cost if this is a stock in transaction
        if (in_array($transaction->transaction_type, ['in', 'return'])) {
            $inventoryItem->update(['unit_cost' => $transaction->unit_cost]);
        }
    }

    /**
     * Revert inventory item changes
     */
    private function revertInventoryItem(InventoryTransaction $transaction)
    {
        $product = $transaction->product;
        $location = $transaction->location;

        $inventoryItem = $product->inventoryItems()
            ->where('location_id', $location->id)
            ->first();

        if (!$inventoryItem) {
            return;
        }

        // Revert quantity changes
        switch ($transaction->transaction_type) {
            case 'in':
            case 'return':
                $inventoryItem->decrement('quantity', $transaction->quantity);
                break;
            case 'out':
            case 'damage':
            case 'expiry':
                $inventoryItem->increment('quantity', $transaction->quantity);
                break;
            case 'transfer':
                // Handle transfer logic if needed
                break;
            case 'adjustment':
                // Revert adjustment if needed
                break;
        }
    }
}
