import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function LocationsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        parent_id: '',
        type: 'warehouse',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        contact_person: '',
        phone: '',
        email: '',
        capacity: '',
        capacity_unit: 'cubic_meters',
        is_active: true,
        is_default: false,
        sort_order: 0,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Locations', href: '/inventory/locations' }, { title: 'Create', href: '/inventory/locations/create' }]}>
            <Head title="Add Location" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Location</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Location Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/locations'); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Location name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Code</label>
                                <Input value={data.code} onChange={e => setData('code', e.target.value)} placeholder="Code" />
                                {errors.code && <div className="text-destructive text-xs mt-1">{errors.code}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Input value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description" />
                                {errors.description && <div className="text-destructive text-xs mt-1">{errors.description}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Parent Location</label>
                                <Input value={data.parent_id} onChange={e => setData('parent_id', e.target.value)} placeholder="Parent location ID" />
                                {errors.parent_id && <div className="text-destructive text-xs mt-1">{errors.parent_id}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select className="w-full border rounded px-2 py-1" value={data.type} onChange={e => setData('type', e.target.value)}>
                                    <option value="warehouse">Warehouse</option>
                                    <option value="shelf">Shelf</option>
                                    <option value="bin">Bin</option>
                                    <option value="aisle">Aisle</option>
                                    <option value="section">Section</option>
                                    <option value="room">Room</option>
                                </select>
                                {errors.type && <div className="text-destructive text-xs mt-1">{errors.type}</div>}
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
                                <label className="block text-sm font-medium mb-1">Contact Person</label>
                                <Input value={data.contact_person} onChange={e => setData('contact_person', e.target.value)} placeholder="Contact person" />
                                {errors.contact_person && <div className="text-destructive text-xs mt-1">{errors.contact_person}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone</label>
                                <Input value={data.phone} onChange={e => setData('phone', e.target.value)} placeholder="Phone" />
                                {errors.phone && <div className="text-destructive text-xs mt-1">{errors.phone}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input value={data.email} onChange={e => setData('email', e.target.value)} placeholder="Email" />
                                {errors.email && <div className="text-destructive text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Capacity</label>
                                <Input type="number" value={data.capacity} onChange={e => setData('capacity', e.target.value)} placeholder="Capacity" />
                                {errors.capacity && <div className="text-destructive text-xs mt-1">{errors.capacity}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Capacity Unit</label>
                                <Input value={data.capacity_unit} onChange={e => setData('capacity_unit', e.target.value)} placeholder="Capacity unit" />
                                {errors.capacity_unit && <div className="text-destructive text-xs mt-1">{errors.capacity_unit}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Active</label>
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                {errors.is_active && <div className="text-destructive text-xs mt-1">{errors.is_active}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Default</label>
                                <input type="checkbox" checked={data.is_default} onChange={e => setData('is_default', e.target.checked)} />
                                {errors.is_default && <div className="text-destructive text-xs mt-1">{errors.is_default}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sort Order</label>
                                <Input type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} placeholder="Sort order" />
                                {errors.sort_order && <div className="text-destructive text-xs mt-1">{errors.sort_order}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Location</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
