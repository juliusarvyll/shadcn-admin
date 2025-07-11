import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function PurchaseOrdersCreate({ suppliers = [] }: { suppliers?: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        po_number: '',
        supplier_id: '',
        created_by: '',
        approved_by: '',
        order_date: '',
        expected_delivery_date: '',
        actual_delivery_date: '',
        status: 'draft',
        payment_status: 'pending',
        subtotal: '',
        tax_amount: '',
        shipping_amount: '',
        discount_amount: '',
        total_amount: '',
        notes: '',
        terms_and_conditions: '',
        shipping_address: '',
        billing_address: '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Purchase Orders', href: '/inventory/purchase-orders' }, { title: 'Create', href: '/inventory/purchase-orders/create' }]}>
            <Head title="Add Purchase Order" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Purchase Order</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Purchase Order Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/purchase-orders'); }} className="space-y-6">
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
                                <label className="block text-sm font-medium mb-1">Created By (User ID)</label>
                                <Input value={data.created_by} onChange={e => setData('created_by', e.target.value)} placeholder="Created by user ID" />
                                {errors.created_by && <div className="text-destructive text-xs mt-1">{errors.created_by}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Approved By (User ID)</label>
                                <Input value={data.approved_by} onChange={e => setData('approved_by', e.target.value)} placeholder="Approved by user ID" />
                                {errors.approved_by && <div className="text-destructive text-xs mt-1">{errors.approved_by}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Order Date</label>
                                <Input type="date" value={data.order_date} onChange={e => setData('order_date', e.target.value)} />
                                {errors.order_date && <div className="text-destructive text-xs mt-1">{errors.order_date}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Expected Delivery Date</label>
                                <Input type="date" value={data.expected_delivery_date} onChange={e => setData('expected_delivery_date', e.target.value)} />
                                {errors.expected_delivery_date && <div className="text-destructive text-xs mt-1">{errors.expected_delivery_date}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Actual Delivery Date</label>
                                <Input type="date" value={data.actual_delivery_date} onChange={e => setData('actual_delivery_date', e.target.value)} />
                                {errors.actual_delivery_date && <div className="text-destructive text-xs mt-1">{errors.actual_delivery_date}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select className="w-full border rounded px-2 py-1" value={data.status} onChange={e => setData('status', e.target.value)}>
                                    <option value="draft">Draft</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="ordered">Ordered</option>
                                    <option value="partially_received">Partially Received</option>
                                    <option value="received">Received</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {errors.status && <div className="text-destructive text-xs mt-1">{errors.status}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Status</label>
                                <select className="w-full border rounded px-2 py-1" value={data.payment_status} onChange={e => setData('payment_status', e.target.value)}>
                                    <option value="pending">Pending</option>
                                    <option value="partial">Partial</option>
                                    <option value="paid">Paid</option>
                                </select>
                                {errors.payment_status && <div className="text-destructive text-xs mt-1">{errors.payment_status}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Subtotal</label>
                                <Input type="number" value={data.subtotal} onChange={e => setData('subtotal', e.target.value)} placeholder="Subtotal" />
                                {errors.subtotal && <div className="text-destructive text-xs mt-1">{errors.subtotal}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tax Amount</label>
                                <Input type="number" value={data.tax_amount} onChange={e => setData('tax_amount', e.target.value)} placeholder="Tax amount" />
                                {errors.tax_amount && <div className="text-destructive text-xs mt-1">{errors.tax_amount}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Shipping Amount</label>
                                <Input type="number" value={data.shipping_amount} onChange={e => setData('shipping_amount', e.target.value)} placeholder="Shipping amount" />
                                {errors.shipping_amount && <div className="text-destructive text-xs mt-1">{errors.shipping_amount}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Discount Amount</label>
                                <Input type="number" value={data.discount_amount} onChange={e => setData('discount_amount', e.target.value)} placeholder="Discount amount" />
                                {errors.discount_amount && <div className="text-destructive text-xs mt-1">{errors.discount_amount}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Total Amount</label>
                                <Input type="number" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} placeholder="Total amount" />
                                {errors.total_amount && <div className="text-destructive text-xs mt-1">{errors.total_amount}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <textarea className="w-full border rounded px-2 py-1" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Notes" />
                                {errors.notes && <div className="text-destructive text-xs mt-1">{errors.notes}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Terms and Conditions</label>
                                <textarea className="w-full border rounded px-2 py-1" value={data.terms_and_conditions} onChange={e => setData('terms_and_conditions', e.target.value)} placeholder="Terms and conditions" />
                                {errors.terms_and_conditions && <div className="text-destructive text-xs mt-1">{errors.terms_and_conditions}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Shipping Address</label>
                                <Input value={data.shipping_address} onChange={e => setData('shipping_address', e.target.value)} placeholder="Shipping address" />
                                {errors.shipping_address && <div className="text-destructive text-xs mt-1">{errors.shipping_address}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Billing Address</label>
                                <Input value={data.billing_address} onChange={e => setData('billing_address', e.target.value)} placeholder="Billing address" />
                                {errors.billing_address && <div className="text-destructive text-xs mt-1">{errors.billing_address}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Purchase Order</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
