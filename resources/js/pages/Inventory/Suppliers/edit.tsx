import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function SuppliersEdit({ supplier }: { supplier: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: supplier.name || '',
        email: supplier.email || '',
        phone: supplier.phone || '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Suppliers', href: '/inventory/suppliers' }, { title: supplier.name, href: `/inventory/suppliers/${supplier.id}` }, { title: 'Edit', href: `/inventory/suppliers/${supplier.id}/edit` }]}>
            <Head title={`Edit Supplier: ${supplier.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Supplier</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Supplier Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/inventory/suppliers/${supplier.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Supplier name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email" />
                                {errors.email && <div className="text-destructive text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <Input value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="Phone" />
                                {errors.phone && <div className="text-destructive text-xs mt-1">{errors.phone}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Supplier</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
