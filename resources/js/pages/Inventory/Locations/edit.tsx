import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function LocationsEdit({ location }: { location: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: location.name || '',
        code: location.code || '',
        type: location.type || '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Locations', href: '/inventory/locations' }, { title: location.name, href: `/inventory/locations/${location.id}` }, { title: 'Edit', href: `/inventory/locations/${location.id}/edit` }]}>
            <Head title={`Edit Location: ${location.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Location</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Location Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/inventory/locations/${location.id}`); }} className="space-y-6">
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
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <Input value={data.type} onChange={e => setData('type', e.target.value)} placeholder="Type" />
                                {errors.type && <div className="text-destructive text-xs mt-1">{errors.type}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Location</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
