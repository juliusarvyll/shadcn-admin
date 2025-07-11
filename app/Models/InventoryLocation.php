<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryLocation extends Model
{
    protected $fillable = [
        'name',
        'code',
        'description',
        'parent_id',
        'type',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'contact_person',
        'phone',
        'email',
        'capacity',
        'capacity_unit',
        'is_active',
        'is_default',
        'sort_order',
    ];

    public function inventoryItems(): HasMany
    {
        return $this->hasMany(InventoryItem::class, 'location_id');
    }

    public function fromTransactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class, 'from_location_id');
    }

    public function toTransactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class, 'to_location_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(InventoryLocation::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(InventoryLocation::class, 'parent_id');
    }
}
