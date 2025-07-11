import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function CategoriesEdit({ category, categories = [] }: { category: any, categories?: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        parent_id: category.parent_id || '',
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Categories', href: '/inventory/categories' }, { title: category.name, href: `/inventory/categories/${category.id}` }, { title: 'Edit', href: `/inventory/categories/${category.id}/edit` }]}>
            <Head title={`Edit Category: ${category.name}`} />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); put(`/inventory/categories/${category.id}`); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Category name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Parent Category</label>
                                <select className="w-full border rounded px-2 py-1" value={data.parent_id} onChange={e => setData('parent_id', e.target.value)}>
                                    <option value="">None</option>
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.parent_id && <div className="text-destructive text-xs mt-1">{errors.parent_id}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Update Category</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
