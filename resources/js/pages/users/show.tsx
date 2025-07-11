import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function UserShow({ user }: { user: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Users', href: '/users' }, { title: user.name, href: `/users/${user.id}` }]}>
            <Head title={`User: ${user.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">User: {user.name}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div><strong>Email:</strong> {user.email}</div>
                            <div><strong>Created:</strong> {user.created_at}</div>
                            <div><strong>Last Login:</strong> {user.last_login || 'Never'}</div>
                            <div>
                                <strong>Roles:</strong> {user.roles && user.roles.length > 0 ? (
                                    user.roles.map((role: any) => (
                                        <Badge key={role.id} className="ml-1" variant="secondary">{role.name}</Badge>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground ml-1">No roles</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
