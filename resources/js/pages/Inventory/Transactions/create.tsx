import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function TransactionsCreate({ products = [], locations = [], purchaseOrders = [] }: { products?: any[], locations?: any[], purchaseOrders?: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        product_id: '',
        from_location_id: '',
        to_location_id: '',
        purchase_order_id: '',
        created_by: '',
        transaction_type: 'purchase',
        quantity: '',
        unit_cost: '',
        total_cost: '',
        reference_number: '',
        reference_type: '',
        notes: '',
        metadata: '',
        transaction_date: '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Transactions', href: '/inventory/transactions' }, { title: 'Create', href: '/inventory/transactions/create' }]}>
            <Head title="Add Transaction" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Transaction</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/transactions'); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Product</label>
                                <select className="w-full border rounded px-2 py-1" value={data.product_id} onChange={e => setData('product_id', e.target.value)}>
                                    <option value="">Select product</option>
                                    {products.map((prod: any) => (
                                        <option key={prod.id} value={prod.id}>{prod.name}</option>
                                    ))}
                                </select>
                                {errors.product_id && <div className="text-destructive text-xs mt-1">{errors.product_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">From Location</label>
                                <select className="w-full border rounded px-2 py-1" value={data.from_location_id} onChange={e => setData('from_location_id', e.target.value)}>
                                    <option value="">Select from location</option>
                                    {locations.map((loc: any) => (
                                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                                    ))}
                                </select>
                                {errors.from_location_id && <div className="text-destructive text-xs mt-1">{errors.from_location_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">To Location</label>
                                <select className="w-full border rounded px-2 py-1" value={data.to_location_id} onChange={e => setData('to_location_id', e.target.value)}>
                                    <option value="">Select to location</option>
                                    {locations.map((loc: any) => (
                                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                                    ))}
                                </select>
                                {errors.to_location_id && <div className="text-destructive text-xs mt-1">{errors.to_location_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Purchase Order (optional)</label>
                                <select className="w-full border rounded px-2 py-1" value={data.purchase_order_id} onChange={e => setData('purchase_order_id', e.target.value)}>
                                    <option value="">None</option>
                                    {purchaseOrders.map((po: any) => (
                                        <option key={po.id} value={po.id}>{po.po_number}</option>
                                    ))}
                                </select>
                                {errors.purchase_order_id && <div className="text-destructive text-xs mt-1">{errors.purchase_order_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Created By (User ID)</label>
                                <Input value={data.created_by} onChange={e => setData('created_by', e.target.value)} placeholder="Created by user ID" />
                                {errors.created_by && <div className="text-destructive text-xs mt-1">{errors.created_by}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Transaction Type</label>
                                <select className="w-full border rounded px-2 py-1" value={data.transaction_type} onChange={e => setData('transaction_type', e.target.value)}>
                                    <option value="purchase">Purchase</option>
                                    <option value="sale">Sale</option>
                                    <option value="transfer">Transfer</option>
                                    <option value="adjustment">Adjustment</option>
                                    <option value="return">Return</option>
                                    <option value="damage">Damage</option>
                                    <option value="loss">Loss</option>
                                    <option value="expiry">Expiry</option>
                                    <option value="initial_stock">Initial Stock</option>
                                    <option value="cycle_count">Cycle Count</option>
                                </select>
                                {errors.transaction_type && <div className="text-destructive text-xs mt-1">{errors.transaction_type}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Quantity</label>
                                <Input type="number" value={data.quantity} onChange={e => setData('quantity', e.target.value)} placeholder="Quantity" />
                                {errors.quantity && <div className="text-destructive text-xs mt-1">{errors.quantity}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Unit Cost</label>
                                <Input type="number" value={data.unit_cost} onChange={e => setData('unit_cost', e.target.value)} placeholder="Unit cost" />
                                {errors.unit_cost && <div className="text-destructive text-xs mt-1">{errors.unit_cost}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Total Cost</label>
                                <Input type="number" value={data.total_cost} onChange={e => setData('total_cost', e.target.value)} placeholder="Total cost" />
                                {errors.total_cost && <div className="text-destructive text-xs mt-1">{errors.total_cost}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Reference Number</label>
                                <Input value={data.reference_number} onChange={e => setData('reference_number', e.target.value)} placeholder="Reference number" />
                                {errors.reference_number && <div className="text-destructive text-xs mt-1">{errors.reference_number}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Reference Type</label>
                                <Input value={data.reference_type} onChange={e => setData('reference_type', e.target.value)} placeholder="Reference type (e.g. purchase_order, invoice)" />
                                {errors.reference_type && <div className="text-destructive text-xs mt-1">{errors.reference_type}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <textarea className="w-full border rounded px-2 py-1" value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Notes" />
                                {errors.notes && <div className="text-destructive text-xs mt-1">{errors.notes}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Metadata (JSON)</label>
                                <textarea className="w-full border rounded px-2 py-1" value={data.metadata} onChange={e => setData('metadata', e.target.value)} placeholder='{"key":"value"}' />
                                {errors.metadata && <div className="text-destructive text-xs mt-1">{errors.metadata}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Transaction Date</label>
                                <Input type="datetime-local" value={data.transaction_date} onChange={e => setData('transaction_date', e.target.value)} />
                                {errors.transaction_date && <div className="text-destructive text-xs mt-1">{errors.transaction_date}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Transaction</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
