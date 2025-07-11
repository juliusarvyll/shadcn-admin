export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    last_login?: string;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    permissions?: Permission[];
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
    users_count?: number;
}

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

export interface UserPermissions {
    permissions: string[];
    roles: string[];
}

export interface Auth {
    user: User | null;
    permissions: UserPermissions;
}

export interface PermissionGroup {
    [key: string]: Permission[];
}
