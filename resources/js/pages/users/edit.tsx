import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function UsersEdit({ user, roles = [] }: { user: any, roles?: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        roles: user.roles ? user.roles.map((r: any) => r.name) : [],
    });

    const handleRoleChange = (role: string) => {
        setData('roles', data.roles.includes(role)
            ? data.roles.filter((r) => r !== role)
            : [...data.roles, role]);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Users', href: '/users' }, { title: user.name, href: `/users/${user.id}` }, { title: 'Edit', href: `/users/${user.id}/edit` }]}>
            <Head title={`Edit User: ${user.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit User</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/users/${user.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email" />
                                {errors.email && <div className="text-destructive text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Roles</label>
                                <div className="flex flex-wrap gap-2">
                                    {roles.map((role: any) => (
                                        <label key={role.id} className="flex items-center gap-2 text-sm">
                                            <Checkbox checked={data.roles.includes(role.name)} onCheckedChange={() => handleRoleChange(role.name)} />
                                            {role.name}
                                        </label>
                                    ))}
                                </div>
                                {errors.roles && <div className="text-destructive text-xs mt-1">{errors.roles}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update User</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
