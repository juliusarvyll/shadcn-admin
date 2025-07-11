import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function LocationsIndex({ locations = [] }: { locations?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Locations', href: '/inventory/locations' }]}>
            <Head title="Locations" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
                    <Link href="/inventory/locations/create">
                        <Button>Add Location</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Location List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Code</th>
                                        <th className="px-4 py-2 text-left">Type</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locations.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center text-muted-foreground py-4">No locations found.</td></tr>
                                    ) : (
                                        locations.map((loc: any) => (
                                            <tr key={loc.id}>
                                                <td className="px-4 py-2">{loc.name}</td>
                                                <td className="px-4 py-2">{loc.code}</td>
                                                <td className="px-4 py-2">{loc.type}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={`/inventory/locations/${loc.id}`}>
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
