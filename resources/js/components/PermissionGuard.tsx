import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';

interface PermissionGuardProps {
    children: React.ReactNode;
    permission?: string;
    permissions?: string[];
    requireAll?: boolean;
    role?: string;
    roles?: string[];
    requireAnyRole?: boolean;
    fallback?: React.ReactNode;
}

export function PermissionGuard({
    children,
    permission,
    permissions,
    requireAll = false,
    role,
    roles,
    requireAnyRole = false,
    fallback = null,
}: PermissionGuardProps) {
    const { can, hasRole, hasAnyPermission, hasAllPermissions, hasAnyRole } = usePermissions();

    // Check permissions
    if (permission && !can(permission)) {
        return <>{fallback}</>;
    }

    if (permissions) {
        const hasPermission = requireAll
            ? hasAllPermissions(permissions)
            : hasAnyPermission(permissions);

        if (!hasPermission) {
            return <>{fallback}</>;
        }
    }

    // Check roles
    if (role && !hasRole(role)) {
        return <>{fallback}</>;
    }

    if (roles) {
        const hasRoleAccess = requireAnyRole
            ? hasAnyRole(roles)
            : roles.every(r => hasRole(r));

        if (!hasRoleAccess) {
            return <>{fallback}</>;
        }
    }

    return <>{children}</>;
}
