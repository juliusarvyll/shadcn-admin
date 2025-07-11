import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function PurchaseOrderShow({ purchaseOrder }: { purchaseOrder: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Purchase Orders', href: '/inventory/purchase-orders' }, { title: purchaseOrder.po_number, href: `/inventory/purchase-orders/${purchaseOrder.id}` }]}>
            <Head title={`Purchase Order: ${purchaseOrder.po_number}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Purchase Order: {purchaseOrder.po_number}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div><strong>Supplier:</strong> {purchaseOrder.supplier?.name}</div>
                            <div><strong>Status:</strong> {purchaseOrder.status}</div>
                            <div><strong>Order Date:</strong> {purchaseOrder.order_date}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
