import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function ProductsIndex({ products = [] }: { products?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Products', href: '/inventory/products' }]}>
            <Head title="Products" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <Link href="/inventory/products/create">
                        <Button>Add Product</Button>
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Product List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Name</th>
                                        <th className="px-4 py-2 text-left">Category</th>
                                        <th className="px-4 py-2 text-left">Supplier</th>
                                        <th className="px-4 py-2 text-left">Stock</th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center text-muted-foreground py-4">No products found.</td></tr>
                                    ) : (
                                        products.map((product: any) => (
                                            <tr key={product.id}>
                                                <td className="px-4 py-2">{product.name}</td>
                                                <td className="px-4 py-2">{product.category?.name}</td>
                                                <td className="px-4 py-2">{product.supplier?.name}</td>
                                                <td className="px-4 py-2">{product.inventory_items_sum_quantity ?? 0}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <Link href={`/inventory/products/${product.id}`}>
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
