<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Permissions
        $permissions = [
            'view dashboard',
            // Categories
            'view categories', 'create categories', 'edit categories', 'delete categories',
            // Products
            'view products', 'create products', 'edit products', 'delete products',
            // Suppliers
            'view suppliers', 'create suppliers', 'edit suppliers', 'delete suppliers',
            // Locations
            'view locations', 'create locations', 'edit locations', 'delete locations',
            // Purchase Orders
            'view purchase orders', 'create purchase orders', 'edit purchase orders', 'delete purchase orders', 'receive purchase orders',
            // Transactions
            'view transactions', 'create transactions', 'edit transactions', 'delete transactions',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Roles
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $manager = Role::firstOrCreate(['name' => 'Manager']);
        $staff = Role::firstOrCreate(['name' => 'Staff']);

        // Assign all permissions to Admin
        $admin->syncPermissions($permissions);

        // Manager: all except delete
        $managerPermissions = array_filter($permissions, function ($perm) {
            return !str_starts_with($perm, 'delete');
        });
        $manager->syncPermissions($managerPermissions);

        // Staff: only view and create
        $staffPermissions = array_filter($permissions, function ($perm) {
            return str_starts_with($perm, 'view') || str_starts_with($perm, 'create');
        });
        $staff->syncPermissions($staffPermissions);
    }
}
