import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { v4 as uuidv4 } from 'uuid';
import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect } from 'react';
import QrCodeScanner from '@/components/qr-code-scanner';

export default function ProductsCreate({ categories = [], suppliers = [] }: { categories?: any[], suppliers?: any[] }) {
    const [cameras, setCameras] = useState<any[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<string>('');

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        sku: string;
        barcode: string;
        description: string;
        category_id: string;
        supplier_id: string;
        brand: string;
        model: string;
        color: string;
        size: string;
        weight_unit: string;
        weight: string;
        dimensions: string;
        image: string;
        images: string;
        cost_price: string;
        selling_price: string;
        wholesale_price: string;
        min_stock_level: number;
        max_stock_level: string;
        unit_of_measure: string;
        is_active: boolean;
        is_trackable: boolean;
        requires_serial_number: boolean;
        notes: string;
    }>({
        name: '',
        sku: '',
        barcode: uuidv4().replace(/-/g, '').slice(0, 12),
        description: '',
        category_id: '',
        supplier_id: '',
        brand: '',
        model: '',
        color: '',
        size: '',
        weight_unit: 'kg',
        weight: '',
        dimensions: '',
        image: '',
        images: '',
        cost_price: '',
        selling_price: '',
        wholesale_price: '',
        min_stock_level: 0,
        max_stock_level: '',
        unit_of_measure: 'piece',
        is_active: true,
        is_trackable: true,
        requires_serial_number: false,
        notes: '',
    });

    // Detect available cameras on component mount
    useEffect(() => {
        Html5Qrcode.getCameras().then(devices => {
            if (devices && devices.length) {
                setCameras(devices);
            }
        }).catch(err => {
            console.error('Error getting cameras:', err);
        });
    }, []);

    const handleScanResult = (decodedText: string, decodedResult: any) => {
        setScanResult(decodedText);
        setData('barcode', decodedText);
        setIsScanning(false);
    };

    const startScanning = () => {
        setIsScanning(true);
    };

    const stopScanning = () => {
        setIsScanning(false);
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Products', href: '/inventory/products' }, { title: 'Create', href: '/inventory/products/create' }]}>
            <Head title="Add Product" />
            <div className="flex flex-col gap-6 p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight">Add Product</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={e => { e.preventDefault(); post('/inventory/products'); }} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Product name" />
                                {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">SKU</label>
                                <Input value={data.sku} onChange={e => setData('sku', e.target.value)} placeholder="SKU" />
                                {errors.sku && <div className="text-destructive text-xs mt-1">{errors.sku}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Barcode</label>
                                <div className="space-y-2">
                                    <Input
                                        value={data.barcode}
                                        onChange={e => setData('barcode', e.target.value)}
                                        placeholder="Barcode"
                                    />
                                    {errors.barcode && <div className="text-destructive text-xs mt-1">{errors.barcode}</div>}

                                    {cameras.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex gap-2">
                                                {!isScanning ? (
                                                    <Button
                                                        type="button"
                                                        onClick={startScanning}
                                                        className="text-sm"
                                                    >
                                                        Scan Barcode
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        onClick={stopScanning}
                                                        variant="destructive"
                                                        className="text-sm"
                                                    >
                                                        Stop Scanning
                                                    </Button>
                                                )}
                                            </div>

                                            {isScanning && (
                                                <div className="border rounded p-4">
                                                    <QrCodeScanner
                                                        onResult={handleScanResult}
                                                    />
                                                    <p className="text-sm text-muted-foreground mt-2">
                                                        Point your camera at a barcode to scan
                                                    </p>
                                                </div>
                                            )}

                                            {scanResult && (
                                                <div className="text-sm text-green-600">
                                                    Scanned: {scanResult}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <Input value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description" />
                                {errors.description && <div className="text-destructive text-xs mt-1">{errors.description}</div>}
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
                                <label className="block text-sm font-medium mb-1">Brand</label>
                                <Input value={data.brand} onChange={e => setData('brand', e.target.value)} placeholder="Brand" />
                                {errors.brand && <div className="text-destructive text-xs mt-1">{errors.brand}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Model</label>
                                <Input value={data.model} onChange={e => setData('model', e.target.value)} placeholder="Model" />
                                {errors.model && <div className="text-destructive text-xs mt-1">{errors.model}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Color</label>
                                <Input value={data.color} onChange={e => setData('color', e.target.value)} placeholder="Color" />
                                {errors.color && <div className="text-destructive text-xs mt-1">{errors.color}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Size</label>
                                <Input value={data.size} onChange={e => setData('size', e.target.value)} placeholder="Size" />
                                {errors.size && <div className="text-destructive text-xs mt-1">{errors.size}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Weight Unit</label>
                                <Input value={data.weight_unit} onChange={e => setData('weight_unit', e.target.value)} placeholder="Weight Unit" />
                                {errors.weight_unit && <div className="text-destructive text-xs mt-1">{errors.weight_unit}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Weight</label>
                                <Input type="number" value={data.weight} onChange={e => setData('weight', e.target.value)} placeholder="Weight" />
                                {errors.weight && <div className="text-destructive text-xs mt-1">{errors.weight}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Dimensions</label>
                                <Input value={data.dimensions} onChange={e => setData('dimensions', e.target.value)} placeholder="Dimensions (LxWxH)" />
                                {errors.dimensions && <div className="text-destructive text-xs mt-1">{errors.dimensions}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <Input value={data.image} onChange={e => setData('image', e.target.value)} placeholder="Image URL" />
                                {errors.image && <div className="text-destructive text-xs mt-1">{errors.image}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Images (JSON array)</label>
                                <Input value={data.images} onChange={e => setData('images', e.target.value)} placeholder='["url1","url2"]' />
                                {errors.images && <div className="text-destructive text-xs mt-1">{errors.images}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Cost Price</label>
                                <Input type="number" value={data.cost_price} onChange={e => setData('cost_price', e.target.value)} placeholder="Cost price" />
                                {errors.cost_price && <div className="text-destructive text-xs mt-1">{errors.cost_price}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Selling Price</label>
                                <Input type="number" value={data.selling_price} onChange={e => setData('selling_price', e.target.value)} placeholder="Selling price" />
                                {errors.selling_price && <div className="text-destructive text-xs mt-1">{errors.selling_price}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Wholesale Price</label>
                                <Input type="number" value={data.wholesale_price} onChange={e => setData('wholesale_price', e.target.value)} placeholder="Wholesale price" />
                                {errors.wholesale_price && <div className="text-destructive text-xs mt-1">{errors.wholesale_price}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Min Stock Level</label>
                                <Input type="number" value={data.min_stock_level} onChange={e => setData('min_stock_level', Number(e.target.value))} placeholder="Min stock level" />
                                {errors.min_stock_level && <div className="text-destructive text-xs mt-1">{errors.min_stock_level}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Max Stock Level</label>
                                <Input type="number" value={data.max_stock_level} onChange={e => setData('max_stock_level', e.target.value)} placeholder="Max stock level" />
                                {errors.max_stock_level && <div className="text-destructive text-xs mt-1">{errors.max_stock_level}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Unit of Measure</label>
                                <Input value={data.unit_of_measure} onChange={e => setData('unit_of_measure', e.target.value)} placeholder="Unit of measure" />
                                {errors.unit_of_measure && <div className="text-destructive text-xs mt-1">{errors.unit_of_measure}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Active</label>
                                <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                {errors.is_active && <div className="text-destructive text-xs mt-1">{errors.is_active}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Trackable</label>
                                <input type="checkbox" checked={data.is_trackable} onChange={e => setData('is_trackable', e.target.checked)} />
                                {errors.is_trackable && <div className="text-destructive text-xs mt-1">{errors.is_trackable}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Requires Serial Number</label>
                                <input type="checkbox" checked={data.requires_serial_number} onChange={e => setData('requires_serial_number', e.target.checked)} />
                                {errors.requires_serial_number && <div className="text-destructive text-xs mt-1">{errors.requires_serial_number}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <Input value={data.notes} onChange={e => setData('notes', e.target.value)} placeholder="Notes" />
                                {errors.notes && <div className="text-destructive text-xs mt-1">{errors.notes}</div>}
                            </div>
                            <Button type="submit" disabled={processing}>Add Product</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
