import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function RoleShow({ role }: { role: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Roles', href: '/roles' }, { title: role.name, href: `/roles/${role.id}` }]}>
            <Head title={`Role: ${role.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Role: {role.name}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {role.permissions.length === 0 ? (
                                <span className="text-muted-foreground">No permissions assigned.</span>
                            ) : (
                                role.permissions.map((perm: any) => (
                                    <Badge key={perm.id} variant="secondary">{perm.name}</Badge>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Users with this Role</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-1">
                            {role.users.length === 0 ? (
                                <li className="text-muted-foreground">No users assigned.</li>
                            ) : (
                                role.users.map((user: any) => (
                                    <li key={user.id}>{user.name} ({user.email})</li>
                                ))
                            )}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
