import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { boolean } from 'yup';

export default function CategoriesCreate({ categories = [] }: { categories?: any[] }) {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        slug: string;
        description: string;
        parent_id: string;
        image: string;
        is_active: boolean;
        sort_order: number;
    }>({
        name: '',
        slug: '',
        description: '',
        parent_id: '',
        image: '',
        is_active: true,
        sort_order: 0,
    });

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Categories', href: '/inventory/categories' }, { title: 'Create', href: '/inventory/categories/create' }]}>
            <Head title="Add Category" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Category</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/categories'); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Category name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug</label>
                                <Input value={data.slug} onChange={e => setData('slug', e.target.value)} placeholder="category-slug" />
                                {errors.slug && <div className="text-destructive text-xs mt-1">{errors.slug}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Input value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description" />
                                {errors.description && <div className="text-destructive text-xs mt-1">{errors.description}</div>}
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
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <Input value={data.image} onChange={e => setData('image', e.target.value)} placeholder="Image URL" />
                                {errors.image && <div className="text-destructive text-xs mt-1">{errors.image}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Active</label>
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                {errors.is_active && <div className="text-destructive text-xs mt-1">{errors.is_active}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Sort Order</label>
                                <Input type="number" value={data.sort_order} onChange={e => setData('sort_order', Number(e.target.value))} placeholder="Sort Order" />
                                {errors.sort_order && <div className="text-destructive text-xs mt-1">{errors.sort_order}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Category</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
