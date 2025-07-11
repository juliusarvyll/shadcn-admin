import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    ShoppingCart,
    Eye,
    Calendar,
    Download,
    Filter
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Analytics',
        href: '/analytics',
    },
];

const metrics = [
    {
        title: 'Total Revenue',
        value: '$45,231.89',
        change: '+20.1%',
        changeType: 'positive' as const,
        icon: DollarSign,
        description: 'vs last month'
    },
    {
        title: 'Active Users',
        value: '2,847',
        change: '+12.5%',
        changeType: 'positive' as const,
        icon: Users,
        description: 'vs last month'
    },
    {
        title: 'Orders',
        value: '1,234',
        change: '-2.3%',
        changeType: 'negative' as const,
        icon: ShoppingCart,
        description: 'vs last month'
    },
    {
        title: 'Page Views',
        value: '89,234',
        change: '+8.2%',
        changeType: 'positive' as const,
        icon: Eye,
        description: 'vs last month'
    }
];

const topPages = [
    { page: '/dashboard', views: 1234, change: '+12%' },
    { page: '/users', views: 987, change: '+8%' },
    { page: '/analytics', views: 756, change: '+15%' },
    { page: '/settings', views: 543, change: '-3%' },
    { page: '/reports', views: 432, change: '+5%' },
];

const recentActivity = [
    { action: 'New user registered', time: '2 minutes ago', user: 'john.doe@example.com' },
    { action: 'Order completed', time: '5 minutes ago', user: 'jane.smith@example.com' },
    { action: 'Payment received', time: '10 minutes ago', user: 'mike.johnson@example.com' },
    { action: 'User updated profile', time: '15 minutes ago', user: 'sarah.wilson@example.com' },
];

export default function Analytics() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                        <p className="text-muted-foreground">
                            Monitor your application performance and user behavior
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="7d">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="24h">Last 24 hours</SelectItem>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                                <SelectItem value="30d">Last 30 days</SelectItem>
                                <SelectItem value="90d">Last 90 days</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric) => (
                        <Card key={metric.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {metric.title}
                                </CardTitle>
                                <metric.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{metric.value}</div>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    {metric.changeType === 'positive' ? (
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className={metric.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                                        {metric.change}
                                    </span>
                                    <span>{metric.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Traffic Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Traffic Overview</CardTitle>
                            <CardDescription>
                                Website traffic over the selected period
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                                <div className="text-center">
                                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Chart component would go here</p>
                                    <p className="text-sm text-muted-foreground">Integration with Chart.js or Recharts</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* User Activity Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Activity</CardTitle>
                            <CardDescription>
                                User engagement and activity patterns
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                                <div className="text-center">
                                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">Activity chart would go here</p>
                                    <p className="text-sm text-muted-foreground">Show user sessions and interactions</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Analytics */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Top Pages */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Pages</CardTitle>
                            <CardDescription>
                                Most visited pages in your application
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {topPages.map((page, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-medium">{page.page}</p>
                                                <p className="text-sm text-muted-foreground">{page.views} views</p>
                                            </div>
                                        </div>
                                        <Badge variant={page.change.startsWith('+') ? 'default' : 'secondary'}>
                                            {page.change}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                                Latest user actions and system events
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.action}</p>
                                            <p className="text-xs text-muted-foreground">{activity.user}</p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {activity.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Additional Analytics */}
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                        <CardDescription>
                            System performance and technical metrics
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-500">99.9%</div>
                                <p className="text-sm text-muted-foreground">Uptime</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-500">245ms</div>
                                <p className="text-sm text-muted-foreground">Average Response Time</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-500">1.2M</div>
                                <p className="text-sm text-muted-foreground">Total Requests</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
