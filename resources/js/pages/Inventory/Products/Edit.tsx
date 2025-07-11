import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function ProductsEdit({ product, categories = [], suppliers = [] }: { product: any, categories?: any[], suppliers?: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        category_id: product.category_id || '',
        supplier_id: product.supplier_id || '',
        sku: product.sku || '',
        barcode: product.barcode || '',
        cost_price: product.cost_price || '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Products', href: '/inventory/products' }, { title: product.name, href: `/inventory/products/${product.id}` }, { title: 'Edit', href: `/inventory/products/${product.id}/edit` }]}>
            <Head title={`Edit Product: ${product.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/inventory/products/${product.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Product name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select className="w-full border rounded px-2 py-1" value={data.category_id} onChange={e => setData('category_id', e.target.value)}>
                                    <option value="">Select category</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <div className="text-destructive text-xs mt-1">{errors.category_id}</div>}
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
                                <label className="block text-sm font-medium mb-1">SKU</label>
                                <Input value={data.sku} onChange={e => setData('sku', e.target.value)} placeholder="SKU" />
                                {errors.sku && <div className="text-destructive text-xs mt-1">{errors.sku}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Barcode</label>
                                <Input value={data.barcode} onChange={e => setData('barcode', e.target.value)} placeholder="Barcode" />
                                {errors.barcode && <div className="text-destructive text-xs mt-1">{errors.barcode}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Cost Price</label>
                                <Input type="number" value={data.cost_price} onChange={e => setData('cost_price', e.target.value)} placeholder="Cost price" />
                                {errors.cost_price && <div className="text-destructive text-xs mt-1">{errors.cost_price}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Product</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
