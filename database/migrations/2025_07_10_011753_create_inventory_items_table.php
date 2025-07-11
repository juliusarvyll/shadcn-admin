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
        Schema::create('inventory_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('location_id')->constrained('inventory_locations')->onDelete('cascade');
            $table->string('serial_number')->nullable()->unique();
            $table->string('lot_number')->nullable();
            $table->date('expiry_date')->nullable();
            $table->date('manufacturing_date')->nullable();
            $table->integer('quantity')->default(1);
            $table->decimal('unit_cost', 15, 2)->nullable();
            $table->decimal('total_cost', 15, 2)->nullable();
            $table->enum('condition', ['new', 'good', 'fair', 'poor', 'damaged', 'expired'])->default('new');
            $table->enum('status', ['available', 'reserved', 'in_transit', 'sold', 'returned', 'damaged', 'lost'])->default('available');
            $table->text('notes')->nullable();
            $table->json('attributes')->nullable(); // Custom attributes for the item
            $table->timestamps();

            $table->index(['product_id', 'location_id']);
            $table->index(['status', 'condition']);
            $table->index(['expiry_date']);
            $table->index(['serial_number']);
            $table->index(['lot_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_items');
    }
};
