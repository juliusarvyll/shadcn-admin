import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function TransactionsIndex({ transactions = [] }: { transactions?: any[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Inventory', href: '/inventory' }, { title: 'Transactions', href: '/inventory/transactions' }]}>
            <Head title="Transactions" />
            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
                <Card>
                    <CardHeader>
                        <CardTitle>Transaction List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-muted">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left">Product</th>
                                        <th className="px-4 py-2 text-left">Location</th>
                                        <th className="px-4 py-2 text-left">User</th>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Quantity</th>
                                        <th className="px-4 py-2 text-left">Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length === 0 ? (
                                        <tr><td colSpan={6} className="text-center text-muted-foreground py-4">No transactions found.</td></tr>
                                    ) : (
                                        transactions.map((tx: any) => (
                                            <tr key={tx.id}>
                                                <td className="px-4 py-2">{tx.product?.name}</td>
                                                <td className="px-4 py-2">{tx.location?.name}</td>
                                                <td className="px-4 py-2">{tx.user?.name}</td>
                                                <td className="px-4 py-2">{tx.transaction_date}</td>
                                                <td className="px-4 py-2">{tx.quantity}</td>
                                                <td className="px-4 py-2">{tx.type}</td>
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
