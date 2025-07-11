import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function SupplierShow({ supplier }: { supplier: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Suppliers', href: '/inventory/suppliers' }, { title: supplier.name, href: `/inventory/suppliers/${supplier.id}` }]}>
            <Head title={`Supplier: ${supplier.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Supplier: {supplier.name}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Supplier Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div><strong>Email:</strong> {supplier.email}</div>
                            <div><strong>Phone:</strong> {supplier.phone}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
