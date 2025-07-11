<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('from_location_id')->nullable()->constrained('inventory_locations')->onDelete('set null');
            $table->foreignId('to_location_id')->nullable()->constrained('inventory_locations')->onDelete('set null');
            $table->foreignId('purchase_order_id')->nullable()->constrained('purchase_orders')->onDelete('set null');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->enum('transaction_type', [
                'purchase', 'sale', 'transfer', 'adjustment', 'return',
                'damage', 'loss', 'expiry', 'initial_stock', 'cycle_count'
            ]);
            $table->integer('quantity');
            $table->decimal('unit_cost', 15, 2)->nullable();
            $table->decimal('total_cost', 15, 2)->nullable();
            $table->string('reference_number')->nullable(); // PO number, invoice number, etc.
            $table->string('reference_type')->nullable(); // 'purchase_order', 'invoice', 'manual', etc.
            $table->text('notes')->nullable();
            $table->json('metadata')->nullable(); // Additional transaction data
            $table->timestamp('transaction_date');
            $table->timestamps();

            $table->index(['product_id', 'transaction_type']);
            $table->index(['transaction_date']);
            $table->index(['reference_number', 'reference_type']);
            $table->index(['from_location_id', 'to_location_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_transactions');
    }
};
