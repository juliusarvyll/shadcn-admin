import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function PurchaseOrdersIndex({ purchaseOrders = [] }: { purchaseOrders?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Purchase Orders', href: '/inventory/purchase-orders' }]}>
            <Head title="Purchase Orders" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
                    <Link href="/inventory/purchase-orders/create">
                        <Button>Add Purchase Order</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Order List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">PO Number</th>
                                        <th className="px-4 py-2 text-left">Supplier</th>
                                        <th className="px-4 py-2 text-left">Status</th>
                                        <th className="px-4 py-2 text-left">Order Date</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseOrders.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center text-muted-foreground py-4">No purchase orders found.</td></tr>
                                    ) : (
                                        purchaseOrders.map((po: any) => (
                                            <tr key={po.id}>
                                                <td className="px-4 py-2">{po.po_number}</td>
                                                <td className="px-4 py-2">{po.supplier?.name}</td>
                                                <td className="px-4 py-2">{po.status}</td>
                                                <td className="px-4 py-2">{po.order_date}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={`/inventory/purchase-orders/${po.id}`}>
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
