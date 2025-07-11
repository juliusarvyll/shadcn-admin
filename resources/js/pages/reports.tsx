import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    FileText,
    Download,
    Calendar,
    Users,
    DollarSign,
    ShoppingCart,
    TrendingUp,
    Filter,
    Search,
    Clock,
    Eye
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const reportTypes = [
    {
        id: 'user-activity',
        title: 'User Activity Report',
        description: 'Detailed user login and activity logs',
        icon: Users,
        category: 'Users',
        lastGenerated: '2024-01-15',
        format: 'PDF'
    },
    {
        id: 'revenue',
        title: 'Revenue Report',
        description: 'Financial performance and revenue analytics',
        icon: DollarSign,
        category: 'Finance',
        lastGenerated: '2024-01-14',
        format: 'Excel'
    },
    {
        id: 'orders',
        title: 'Order Summary',
        description: 'Order processing and fulfillment status',
        icon: ShoppingCart,
        category: 'Sales',
        lastGenerated: '2024-01-15',
        format: 'CSV'
    },
    {
        id: 'analytics',
        title: 'Analytics Overview',
        description: 'Website traffic and user behavior metrics',
        icon: TrendingUp,
        category: 'Analytics',
        lastGenerated: '2024-01-13',
        format: 'PDF'
    },
    {
        id: 'system-logs',
        title: 'System Logs',
        description: 'Application errors and system events',
        icon: FileText,
        category: 'System',
        lastGenerated: '2024-01-15',
        format: 'TXT'
    },
    {
        id: 'audit-trail',
        title: 'Audit Trail',
        description: 'User actions and data modifications',
        icon: Eye,
        category: 'Security',
        lastGenerated: '2024-01-12',
        format: 'PDF'
    }
];

const recentReports = [
    {
        name: 'User Activity Report - Jan 2024',
        type: 'PDF',
        size: '2.4 MB',
        generated: '2 hours ago',
        status: 'completed'
    },
    {
        name: 'Revenue Report - Q4 2023',
        type: 'Excel',
        size: '1.8 MB',
        generated: '1 day ago',
        status: 'completed'
    },
    {
        name: 'System Logs - Jan 15',
        type: 'TXT',
        size: '5.2 MB',
        generated: '3 days ago',
        status: 'completed'
    }
];

export default function Reports() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                        <p className="text-muted-foreground">
                            Generate and manage system reports
                        </p>
                    </div>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export All
                    </Button>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Filter className="h-5 w-5" />
                            <span>Report Filters</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="users">Users</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="sales">Sales</SelectItem>
                                        <SelectItem value="analytics">Analytics</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                        <SelectItem value="security">Security</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date-range">Date Range</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Last 30 days" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7d">Last 7 days</SelectItem>
                                        <SelectItem value="30d">Last 30 days</SelectItem>
                                        <SelectItem value="90d">Last 90 days</SelectItem>
                                        <SelectItem value="1y">Last year</SelectItem>
                                        <SelectItem value="custom">Custom range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="format">Format</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Formats" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Formats</SelectItem>
                                        <SelectItem value="pdf">PDF</SelectItem>
                                        <SelectItem value="excel">Excel</SelectItem>
                                        <SelectItem value="csv">CSV</SelectItem>
                                        <SelectItem value="txt">Text</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="search">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search reports..." className="pl-8" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Report Types */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reportTypes.map((report) => (
                        <Card key={report.id} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <report.icon className="h-5 w-5 text-muted-foreground" />
                                        <Badge variant="outline">{report.category}</Badge>
                                    </div>
                                    <Badge variant="secondary">{report.format}</Badge>
                                </div>
                                <CardTitle className="text-lg">{report.title}</CardTitle>
                                <CardDescription>{report.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Last generated:</span>
                                    <span>{report.lastGenerated}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <Button size="sm" className="flex-1">
                                        <Download className="mr-2 h-4 w-4" />
                                        Generate
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Reports */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Reports</CardTitle>
                        <CardDescription>
                            Recently generated reports and their status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentReports.map((report, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{report.name}</p>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <span>{report.type}</span>
                                                <span>{report.size}</span>
                                                <span className="flex items-center">
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    {report.generated}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                                            {report.status}
                                        </Badge>
                                        <Button size="sm" variant="outline">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Scheduled Reports */}
                <Card>
                    <CardHeader>
                        <CardTitle>Scheduled Reports</CardTitle>
                        <CardDescription>
                            Automatically generated reports on a schedule
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">Weekly User Activity Report</p>
                                    <p className="text-sm text-muted-foreground">
                                        Generated every Monday at 9:00 AM
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="default">Active</Badge>
                                    <Button size="sm" variant="outline">Edit</Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-medium">Monthly Revenue Report</p>
                                    <p className="text-sm text-muted-foreground">
                                        Generated on the 1st of each month
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge variant="secondary">Paused</Badge>
                                    <Button size="sm" variant="outline">Edit</Button>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className="mt-4">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule New Report
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
