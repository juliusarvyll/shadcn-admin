import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function PurchaseOrdersEdit({ purchaseOrder, suppliers = [] }: { purchaseOrder: any, suppliers?: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        po_number: purchaseOrder.po_number || '',
        supplier_id: purchaseOrder.supplier_id || '',
        order_date: purchaseOrder.order_date || '',
        status: purchaseOrder.status || '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Purchase Orders', href: '/inventory/purchase-orders' }, { title: purchaseOrder.po_number, href: `/inventory/purchase-orders/${purchaseOrder.id}` }, { title: 'Edit', href: `/inventory/purchase-orders/${purchaseOrder.id}/edit` }]}>
            <Head title={`Edit Purchase Order: ${purchaseOrder.po_number}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Purchase Order</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/inventory/purchase-orders/${purchaseOrder.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">PO Number</label>
                                <Input value={data.po_number} onChange={e => setData('po_number', e.target.value)} placeholder="PO Number" />
                                {errors.po_number && <div className="text-destructive text-xs mt-1">{errors.po_number}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Supplier</label>
                                <select className="w-full border rounded px-2 py-1" value={data.supplier_id} onChange={e => setData('supplier_id', e.target.value)}>
                                    <option value="">Select supplier</option>
                                    {suppliers.map((sup: any) => (
                                        <option key={sup.id} value={sup.id}>{sup.name}</option>
                                    ))}
                                </select>
                                {errors.supplier_id && <div className="text-destructive text-xs mt-1">{errors.supplier_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Order Date</label>
                                <Input type="date" value={data.order_date} onChange={e => setData('order_date', e.target.value)} />
                                {errors.order_date && <div className="text-destructive text-xs mt-1">{errors.order_date}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <Input value={data.status} onChange={e => setData('status', e.target.value)} placeholder="Status" />
                                {errors.status && <div className="text-destructive text-xs mt-1">{errors.status}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Purchase Order</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
