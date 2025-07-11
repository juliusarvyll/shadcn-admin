import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function LocationShow({ location }: { location: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Locations', href: '/inventory/locations' }, { title: location.name, href: `/inventory/locations/${location.id}` }]}>
            <Head title={`Location: ${location.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Location: {location.name}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Location Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div><strong>Code:</strong> {location.code}</div>
                            <div><strong>Type:</strong> {location.type}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
