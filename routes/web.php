<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Inventory\CategoryController;
use App\Http\Controllers\Inventory\ProductController;
use App\Http\Controllers\Inventory\SupplierController;
use App\Http\Controllers\Inventory\LocationController;
use App\Http\Controllers\Inventory\PurchaseOrderController;
use App\Http\Controllers\Inventory\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Inventory Routes
    Route::prefix('inventory')->name('inventory.')->group(function () {
        // Product Scanner
        Route::get('scanner', function () {
            return Inertia::render('Inventory/ProductScanner');
        })->name('scanner');

        // Categories
        Route::resource('categories', CategoryController::class);
        Route::get('categories/api/list', [CategoryController::class, 'getCategories'])->name('categories.api.list');

        // Products
        Route::resource('products', ProductController::class);
        Route::get('products/search', [ProductController::class, 'search'])->name('products.search');
        Route::get('products/barcode/{barcode}', [ProductController::class, 'getByBarcode'])->name('products.barcode');

        // Suppliers
        Route::resource('suppliers', SupplierController::class);
        Route::get('suppliers/api/list', [SupplierController::class, 'getSuppliers'])->name('suppliers.api.list');
        Route::get('suppliers/search', [SupplierController::class, 'search'])->name('suppliers.search');

        // Locations
        Route::resource('locations', LocationController::class);
        Route::get('locations/api/list', [LocationController::class, 'getLocations'])->name('locations.api.list');
        Route::get('locations/default', [LocationController::class, 'getDefaultLocation'])->name('locations.default');
        Route::get('locations/search', [LocationController::class, 'search'])->name('locations.search');

        // Purchase Orders
        Route::resource('purchase-orders', PurchaseOrderController::class);
        Route::patch('purchase-orders/{purchaseOrder}/status', [PurchaseOrderController::class, 'updateStatus'])->name('purchase-orders.status');
        Route::post('purchase-orders/{purchaseOrder}/receive', [PurchaseOrderController::class, 'receive'])->name('purchase-orders.receive');
        Route::get('purchase-orders/api/list', [PurchaseOrderController::class, 'getPurchaseOrders'])->name('purchase-orders.api.list');

        // Transactions
        Route::resource('transactions', TransactionController::class);
        Route::get('transactions/product/{product}/history', [TransactionController::class, 'getProductHistory'])->name('transactions.product.history');
        Route::get('transactions/location/{location}/history', [TransactionController::class, 'getLocationHistory'])->name('transactions.location.history');
        Route::get('transactions/summary', [TransactionController::class, 'getSummary'])->name('transactions.summary');
    });
});

require __DIR__.'/auth.php';
