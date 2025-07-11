import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function CategoriesIndex({ categories = [] }: { categories?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Categories', href: '/inventory/categories' }]}>
            <Head title="Categories" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <Link href="/inventory/categories/create">
                        <Button>Add Category</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Category List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Parent</th>
                                        <th className="px-4 py-2 text-left">Products</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length === 0 ? (
                                        <tr><td colSpan={4} className="text-center text-muted-foreground py-4">No categories found.</td></tr>
                                    ) : (
                                        categories.map((cat: any) => (
                                            <tr key={cat.id}>
                                                <td className="px-4 py-2">{cat.name}</td>
                                                <td className="px-4 py-2">{cat.parent?.name || '-'}</td>
                                                <td className="px-4 py-2">{cat.products_count}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={`/inventory/categories/${cat.id}`}>
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
