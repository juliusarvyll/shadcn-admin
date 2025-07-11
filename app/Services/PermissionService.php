<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionService
{
    /**
     * Get all permissions for the authenticated user
     */
    public static function getUserPermissions(): array
    {
        if (!Auth::check()) {
            return [
                'permissions' => [],
                'roles' => [],
            ];
        }

        $user = Auth::user();

        return [
            'permissions' => $user->getAllPermissions()->pluck('name')->toArray(),
            'roles' => $user->getRoleNames()->toArray(),
        ];
    }

    /**
     * Get all available permissions grouped by category
     */
    public static function getAllPermissions(): array
    {
        return Permission::orderBy('name')->get()->groupBy(function ($permission) {
            return explode(' ', $permission->name)[1] ?? 'other';
        })->toArray();
    }

    /**
     * Get all available roles
     */
    public static function getAllRoles(): array
    {
        return Role::with('permissions')
            ->withCount('users')
            ->orderBy('name')
            ->get()
            ->toArray();
    }

    /**
     * Check if user has any of the given permissions
     */
    public static function hasAnyPermission(array $permissions): bool
    {
        if (!Auth::check()) {
            return false;
        }

        return Auth::user()->hasAnyPermission($permissions);
    }

    /**
     * Check if user has all of the given permissions
     */
    public static function hasAllPermissions(array $permissions): bool
    {
        if (!Auth::check()) {
            return false;
        }

        return Auth::user()->hasAllPermissions($permissions);
    }

    /**
     * Check if user has a specific permission
     */
    public static function hasPermission(string $permission): bool
    {
        if (!Auth::check()) {
            return false;
        }

        return Auth::user()->hasPermissionTo($permission);
    }
}
