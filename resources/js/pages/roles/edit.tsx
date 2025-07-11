import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function RolesEdit({ role, permissions = {} }: { role: any, permissions?: Record<string, any[]> }) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || '',
        permissions: role.permissions.map((p: any) => p.name) || [],
    });

    const handlePermissionChange = (perm: string) => {
        setData('permissions', data.permissions.includes(perm)
            ? data.permissions.filter((p) => p !== perm)
            : [...data.permissions, perm]);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Roles', href: '/roles' }, { title: role.name, href: `/roles/${role.id}` }, { title: 'Edit', href: `/roles/${role.id}/edit` }]}>
            <Head title={`Edit Role: ${role.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Role</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Role Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/roles/${role.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Role Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Role name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Permissions</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {Object.entries(permissions).map(([group, perms]) => (
                                        <div key={group}>
                                            <div className="font-semibold text-xs mb-1">{group}</div>
                                            {perms.map((perm: any) => (
                                                <label key={perm.id} className="flex items-center gap-2 text-sm">
                                                    <Checkbox checked={data.permissions.includes(perm.name)} onCheckedChange={() => handlePermissionChange(perm.name)} />
                                                    {perm.name}
                                                </label>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                {errors.permissions && <div className="text-destructive text-xs mt-1">{errors.permissions}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Role</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
