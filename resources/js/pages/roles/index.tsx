import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function RolesIndex({ roles = [] }: { roles?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Roles', href: '/roles' }]}>
            <Head title="Roles" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Roles</h1>
                    <Button href="/roles/create">Create Role</Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Role List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {roles.length === 0 ? (
                                <div className="text-muted-foreground">No roles found.</div>
                            ) : (
                                <ul className="divide-y divide-muted">
                                    {roles.map((role) => (
                                        <li key={role.id} className="flex items-center justify-between py-2">
                                            <div>
                                                <span className="font-medium">{role.name}</span>
                                                <Badge className="ml-2" variant="secondary">{role.users_count} users</Badge>
                                            </div>
                                            <Button size="sm" variant="outline" href={`/roles/${role.id}`}>View</Button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
