import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Barcode from 'react-barcode';

export default function ProductShow({ product }: { product: any }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Products', href: '/inventory/products' }, { title: product.name, href: `/inventory/products/${product.id}` }]}>
            <Head title={`Product: ${product.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Product: {product.name}</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div><strong>Category:</strong> {product.category?.name}</div>
                            <div><strong>Supplier:</strong> {product.supplier?.name}</div>
                            <div><strong>SKU:</strong> {product.sku}</div>
                            <div><strong>Barcode:</strong> {product.barcode}</div>
                            {product.barcode && (
                                <div className="my-2">
                                    <Barcode value={product.barcode} />
                                </div>
                            )}
                            <div><strong>Cost Price:</strong> {product.cost_price}</div>
                            <div><strong>Stock:</strong> {product.inventory_items_sum_quantity ?? 0}</div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
