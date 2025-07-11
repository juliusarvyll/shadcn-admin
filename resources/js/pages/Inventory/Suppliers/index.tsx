import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function SuppliersIndex({ suppliers = [] }: { suppliers?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Suppliers', href: '/inventory/suppliers' }]}>
            <Head title="Suppliers" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
                    <Link href="/inventory/suppliers/create">
                        <Button>Add Supplier</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Supplier List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Email</th>
                                        <th className="px-4 py-2 text-left">Phone</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center text-muted-foreground py-4">No suppliers found.</td></tr>
                                    ) : (
                                        suppliers.map((sup: any) => (
                                            <tr key={sup.id}>
                                                <td className="px-4 py-2">{sup.name}</td>
                                                <td className="px-4 py-2">{sup.email}</td>
                                                <td className="px-4 py-2">{sup.phone}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={`/inventory/suppliers/${sup.id}`}>
                                                        <Button size="sm" variant="outline">View</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
