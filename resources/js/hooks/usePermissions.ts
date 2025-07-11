import { usePage } from '@inertiajs/react';
import { Auth } from '@/types/auth';

export function usePermissions() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const can = (permission: string): boolean => {
        if (!auth.permissions) return false;
        return auth.permissions.permissions.includes(permission);
    };

    const hasRole = (role: string): boolean => {
        if (!auth.permissions) return false;
        return auth.permissions.roles.includes(role);
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(permission => can(permission));
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        return permissions.every(permission => can(permission));
    };

    const hasAnyRole = (roles: string[]): boolean => {
        return roles.some(role => hasRole(role));
    };

    return {
        can,
        hasRole,
        hasAnyPermission,
        hasAllPermissions,
        hasAnyRole,
        permissions: auth.permissions?.permissions || [],
        roles: auth.permissions?.roles || [],
    };
}
