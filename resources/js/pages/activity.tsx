import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Activity,
    Users,
    Shield,
    AlertTriangle,
    CheckCircle,
    Clock,
    Filter,
    Search,
    Download,
    Eye,
    User,
    Settings,
    Database,
    Globe
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Activity',
        href: '/activity',
    },
];

const activityLogs = [
    {
        id: 1,
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: '/avatars/01.png'
        },
        action: 'User logged in',
        category: 'Authentication',
        severity: 'info',
        timestamp: '2024-01-15T10:30:00Z',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
        id: 2,
        user: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: '/avatars/02.png'
        },
        action: 'Updated user profile',
        category: 'User Management',
        severity: 'info',
        timestamp: '2024-01-15T10:25:00Z',
        ip: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
        id: 3,
        user: {
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: '/avatars/03.png'
        },
        action: 'Created new user account',
        category: 'User Management',
        severity: 'success',
        timestamp: '2024-01-15T10:20:00Z',
        ip: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
        id: 4,
        user: {
            name: 'System',
            email: 'system@example.com',
            avatar: null
        },
        action: 'Database backup completed',
        category: 'System',
        severity: 'success',
        timestamp: '2024-01-15T10:15:00Z',
        ip: '127.0.0.1',
        userAgent: 'System Process'
    },
    {
        id: 5,
        user: {
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: '/avatars/04.png'
        },
        action: 'Failed login attempt',
        category: 'Security',
        severity: 'warning',
        timestamp: '2024-01-15T10:10:00Z',
        ip: '192.168.1.103',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
    },
    {
        id: 6,
        user: {
            name: 'David Brown',
            email: 'david.brown@example.com',
            avatar: '/avatars/05.png'
        },
        action: 'Deleted user account',
        category: 'User Management',
        severity: 'danger',
        timestamp: '2024-01-15T10:05:00Z',
        ip: '192.168.1.104',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
];

const getSeverityBadge = (severity: string) => {
    const variants = {
        info: 'secondary',
        success: 'default',
        warning: 'outline',
        danger: 'destructive',
    } as const;

    return (
        <Badge variant={variants[severity as keyof typeof variants] || 'secondary'}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </Badge>
    );
};

const getCategoryIcon = (category: string) => {
    const icons = {
        'Authentication': Shield,
        'User Management': Users,
        'System': Settings,
        'Security': AlertTriangle,
        'Database': Database,
        'Network': Globe,
    } as const;

    const Icon = icons[category as keyof typeof icons] || Activity;
    return <Icon className="h-4 w-4" />;
};

const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function ActivityPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
                        <p className="text-muted-foreground">
                            Monitor system activity and user actions
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export Logs
                        </Button>
                        <Button>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Filter className="h-5 w-5" />
                            <span>Activity Filters</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="authentication">Authentication</SelectItem>
                                        <SelectItem value="user-management">User Management</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                        <SelectItem value="security">Security</SelectItem>
                                        <SelectItem value="database">Database</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Severity</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Severities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Severities</SelectItem>
                                        <SelectItem value="info">Info</SelectItem>
                                        <SelectItem value="success">Success</SelectItem>
                                        <SelectItem value="warning">Warning</SelectItem>
                                        <SelectItem value="danger">Danger</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Time Range</label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Last 24 hours" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1h">Last hour</SelectItem>
                                        <SelectItem value="24h">Last 24 hours</SelectItem>
                                        <SelectItem value="7d">Last 7 days</SelectItem>
                                        <SelectItem value="30d">Last 30 days</SelectItem>
                                        <SelectItem value="custom">Custom range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search activities..." className="pl-8" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">
                                +12% from last hour
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">47</div>
                            <p className="text-xs text-muted-foreground">
                                Currently online
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">
                                Last 24 hours
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">System Health</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">Good</div>
                            <p className="text-xs text-muted-foreground">
                                All systems operational
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Log */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest system activities and user actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {activityLogs.map((log) => (
                                <div key={log.id} className="flex items-start space-x-4">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={log.user.avatar || undefined} alt={log.user.name} />
                                        <AvatarFallback>
                                            {log.user.avatar ?
                                                log.user.name.split(' ').map(n => n[0]).join('') :
                                                <User className="h-4 w-4" />
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-medium">{log.user.name}</p>
                                            <span className="text-sm text-muted-foreground">•</span>
                                            <span className="text-sm text-muted-foreground">{log.user.email}</span>
                                        </div>
                                        <p className="text-sm">{log.action}</p>
                                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                            <div className="flex items-center space-x-1">
                                                {getCategoryIcon(log.category)}
                                                <span>{log.category}</span>
                                            </div>
                                            <span>IP: {log.ip}</span>
                                            <span className="flex items-center">
                                                <Clock className="mr-1 h-3 w-3" />
                                                {formatTimestamp(log.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {getSeverityBadge(log.severity)}
                                        <Button size="sm" variant="outline">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center">
                            <Button variant="outline">
                                Load More
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Real-time Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Real-time Activity</CardTitle>
                        <CardDescription>
                            Live system events and user interactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New user registration</p>
                                    <p className="text-xs text-muted-foreground">alice.smith@example.com just registered</p>
                                </div>
                                <span className="text-xs text-muted-foreground">Just now</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Database query executed</p>
                                    <p className="text-xs text-muted-foreground">SELECT * FROM users WHERE status = 'active'</p>
                                </div>
                                <span className="text-xs text-muted-foreground">2 seconds ago</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">High memory usage detected</p>
                                    <p className="text-xs text-muted-foreground">Memory usage at 85%</p>
                                </div>
                                <span className="text-xs text-muted-foreground">5 seconds ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
