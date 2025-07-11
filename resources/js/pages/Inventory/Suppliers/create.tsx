import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function SuppliersCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        contact_person: '',
        email: '',
        phone: '',
        fax: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        website: '',
        notes: '',
        payment_terms: 'net_30',
        credit_limit: '',
        is_active: true,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Suppliers', href: '/inventory/suppliers' }, { title: 'Create', href: '/inventory/suppliers/create' }]}>
            <Head title="Add Supplier" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Supplier</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Supplier Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/suppliers'); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Supplier name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Code</label>
                                <Input value={data.code} onChange={e => setData('code', e.target.value)} placeholder="Supplier code" />
                                {errors.code && <div className="text-destructive text-xs mt-1">{errors.code}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Person</label>
                                <Input value={data.contact_person} onChange={e => setData('contact_person', e.target.value)} placeholder="Contact person" />
                                {errors.contact_person && <div className="text-destructive text-xs mt-1">{errors.contact_person}</div>}
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Fax</label>
                                <Input value={data.fax} onChange={e => setData('fax', e.target.value)} placeholder="Fax" />
                                {errors.fax && <div className="text-destructive text-xs mt-1">{errors.fax}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Address</label>
                                <Input value={data.address} onChange={e => setData('address', e.target.value)} placeholder="Address" />
                                {errors.address && <div className="text-destructive text-xs mt-1">{errors.address}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">City</label>
                                <Input value={data.city} onChange={e => setData('city', e.target.value)} placeholder="City" />
                                {errors.city && <div className="text-destructive text-xs mt-1">{errors.city}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">State</label>
                                <Input value={data.state} onChange={e => setData('state', e.target.value)} placeholder="State" />
                                {errors.state && <div className="text-destructive text-xs mt-1">{errors.state}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Postal Code</label>
                                <Input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} placeholder="Postal code" />
                                {errors.postal_code && <div className="text-destructive text-xs mt-1">{errors.postal_code}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <Input value={data.country} onChange={e => setData('country', e.target.value)} placeholder="Country" />
                                {errors.country && <div className="text-destructive text-xs mt-1">{errors.country}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Website</label>
                                <Input value={data.website} onChange={e => setData('website', e.target.value)} placeholder="Website" />
                                {errors.website && <div className="text-destructive text-xs mt-1">{errors.website}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <Input value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Notes" />
                                {errors.notes && <div className="text-destructive text-xs mt-1">{errors.notes}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Payment Terms</label>
                                <select className="w-full border rounded px-2 py-1" value={data.payment_terms} onChange={e => setData('payment_terms', e.target.value)}>
                                    <option value="net_30">Net 30</option>
                                    <option value="net_60">Net 60</option>
                                    <option value="net_90">Net 90</option>
                                    <option value="immediate">Immediate</option>
                                    <option value="custom">Custom</option>
                                </select>
                                {errors.payment_terms && <div className="text-destructive text-xs mt-1">{errors.payment_terms}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Credit Limit</label>
                                <Input type="number" value={data.credit_limit} onChange={e => setData('credit_limit', e.target.value)} placeholder="Credit limit" />
                                {errors.credit_limit && <div className="text-destructive text-xs mt-1">{errors.credit_limit}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Active</label>
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                {errors.is_active && <div className="text-destructive text-xs mt-1">{errors.is_active}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Supplier</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
