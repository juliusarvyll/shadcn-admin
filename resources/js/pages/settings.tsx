import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Settings,
    Save,
    Globe,
    Shield,
    Mail,
    Database,
    Bell,
    Palette,
    Users,
    Key,
    Server,
    Zap
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings',
    },
];

export default function SettingsPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Settings" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                        <p className="text-muted-foreground">
                            Manage your application configuration
                        </p>
                    </div>
                    <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                    </Button>
                </div>

                <Tabs defaultValue="general" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="general" className="flex items-center space-x-2">
                            <Settings className="h-4 w-4" />
                            <span>General</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span>Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="flex items-center space-x-2">
                            <Palette className="h-4 w-4" />
                            <span>Appearance</span>
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="flex items-center space-x-2">
                            <Bell className="h-4 w-4" />
                            <span>Notifications</span>
                        </TabsTrigger>
                        <TabsTrigger value="integrations" className="flex items-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>Integrations</span>
                        </TabsTrigger>
                        <TabsTrigger value="advanced" className="flex items-center space-x-2">
                            <Server className="h-4 w-4" />
                            <span>Advanced</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* General Settings */}
                    <TabsContent value="general" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Globe className="h-5 w-5" />
                                        <span>Application Settings</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Basic application configuration
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="app-name">Application Name</Label>
                                        <Input id="app-name" defaultValue="Admin Dashboard" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="app-url">Application URL</Label>
                                        <Input id="app-url" defaultValue="https://admin.example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select defaultValue="utc">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="utc">UTC</SelectItem>
                                                <SelectItem value="est">Eastern Time</SelectItem>
                                                <SelectItem value="pst">Pacific Time</SelectItem>
                                                <SelectItem value="gmt">GMT</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select defaultValue="en">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Mail className="h-5 w-5" />
                                        <span>Email Settings</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Configure email notifications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="smtp-host">SMTP Host</Label>
                                        <Input id="smtp-host" defaultValue="smtp.gmail.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="smtp-port">SMTP Port</Label>
                                        <Input id="smtp-port" defaultValue="587" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="smtp-username">SMTP Username</Label>
                                        <Input id="smtp-username" defaultValue="noreply@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="smtp-password">SMTP Password</Label>
                                        <Input id="smtp-password" type="password" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="email-encryption" defaultChecked />
                                        <Label htmlFor="email-encryption">Use encryption (TLS)</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Security Settings */}
                    <TabsContent value="security" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Shield className="h-5 w-5" />
                                        <span>Authentication</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Security and authentication settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                                        <Input id="session-timeout" defaultValue="120" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                                        <Input id="max-login-attempts" defaultValue="5" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lockout-duration">Lockout Duration (minutes)</Label>
                                        <Input id="lockout-duration" defaultValue="15" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="two-factor" defaultChecked />
                                        <Label htmlFor="two-factor">Require Two-Factor Authentication</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="password-policy" defaultChecked />
                                        <Label htmlFor="password-policy">Enforce Strong Password Policy</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Key className="h-5 w-5" />
                                        <span>API Security</span>
                                    </CardTitle>
                                    <CardDescription>
                                        API and external access settings
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="api-rate-limit">API Rate Limit (requests/minute)</Label>
                                        <Input id="api-rate-limit" defaultValue="60" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="api-key-expiry">API Key Expiry (days)</Label>
                                        <Input id="api-key-expiry" defaultValue="90" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="cors-enabled" defaultChecked />
                                        <Label htmlFor="cors-enabled">Enable CORS</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="api-logging" defaultChecked />
                                        <Label htmlFor="api-logging">Log API Requests</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Allowed Origins</Label>
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="mr-2">https://app.example.com</Badge>
                                            <Badge variant="outline" className="mr-2">https://api.example.com</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Palette className="h-5 w-5" />
                                        <span>Theme Settings</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Customize the application appearance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Default Theme</Label>
                                        <Select defaultValue="system">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="primary-color">Primary Color</Label>
                                        <Select defaultValue="blue">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="blue">Blue</SelectItem>
                                                <SelectItem value="green">Green</SelectItem>
                                                <SelectItem value="purple">Purple</SelectItem>
                                                <SelectItem value="red">Red</SelectItem>
                                                <SelectItem value="orange">Orange</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="sidebar-width">Sidebar Width</Label>
                                        <Select defaultValue="default">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="compact">Compact</SelectItem>
                                                <SelectItem value="default">Default</SelectItem>
                                                <SelectItem value="wide">Wide</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="animations" defaultChecked />
                                        <Label htmlFor="animations">Enable Animations</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Users className="h-5 w-5" />
                                        <span>User Interface</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Interface and display preferences
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="table-density">Table Density</Label>
                                        <Select defaultValue="comfortable">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="compact">Compact</SelectItem>
                                                <SelectItem value="comfortable">Comfortable</SelectItem>
                                                <SelectItem value="spacious">Spacious</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date-format">Date Format</Label>
                                        <Select defaultValue="mm/dd/yyyy">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                                                <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                                                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time-format">Time Format</Label>
                                        <Select defaultValue="12h">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12h">12-hour</SelectItem>
                                                <SelectItem value="24h">24-hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="show-avatars" defaultChecked />
                                        <Label htmlFor="show-avatars">Show User Avatars</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Notifications Settings */}
                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Bell className="h-5 w-5" />
                                    <span>Notification Preferences</span>
                                </CardTitle>
                                <CardDescription>
                                    Configure how you receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-medium">Email Notifications</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">New User Registration</p>
                                                <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">System Alerts</p>
                                                <p className="text-sm text-muted-foreground">Receive system and security alerts</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Weekly Reports</p>
                                                <p className="text-sm text-muted-foreground">Get weekly summary reports</p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="font-medium">In-App Notifications</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Real-time Updates</p>
                                                <p className="text-sm text-muted-foreground">Show real-time activity updates</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Sound Alerts</p>
                                                <p className="text-sm text-muted-foreground">Play sound for important notifications</p>
                                            </div>
                                            <Switch />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Integrations Settings */}
                    <TabsContent value="integrations" className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2">
                                        <Zap className="h-5 w-5" />
                                        <span>Third-party Integrations</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Connect external services and APIs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="google-analytics">Google Analytics ID</Label>
                                        <Input id="google-analytics" placeholder="GA-XXXXXXXXX-X" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stripe-key">Stripe Secret Key</Label>
                                        <Input id="stripe-key" type="password" placeholder="sk_test_..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="aws-access-key">AWS Access Key</Label>
                                        <Input id="aws-access-key" placeholder="AKIA..." />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="webhooks-enabled" defaultChecked />
                                        <Label htmlFor="webhooks-enabled">Enable Webhooks</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Connected Services</CardTitle>
                                    <CardDescription>
                                        Currently connected integrations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">G</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Google Analytics</p>
                                                <p className="text-sm text-muted-foreground">Connected</p>
                                            </div>
                                        </div>
                                        <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">S</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Stripe</p>
                                                <p className="text-sm text-muted-foreground">Connected</p>
                                            </div>
                                        </div>
                                        <Badge variant="default">Active</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 bg-orange-500 rounded flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">A</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">AWS S3</p>
                                                <p className="text-sm text-muted-foreground">Not connected</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary">Inactive</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Advanced Settings */}
                    <TabsContent value="advanced" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Server className="h-5 w-5" />
                                    <span>System Configuration</span>
                                </CardTitle>
                                <CardDescription>
                                    Advanced system settings and maintenance
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Database</h4>
                                        <div className="space-y-2">
                                            <Label htmlFor="db-backup-frequency">Backup Frequency</Label>
                                            <Select defaultValue="daily">
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hourly">Hourly</SelectItem>
                                                    <SelectItem value="daily">Daily</SelectItem>
                                                    <SelectItem value="weekly">Weekly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="auto-backup" defaultChecked />
                                            <Label htmlFor="auto-backup">Automatic Backups</Label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="font-medium">Performance</h4>
                                        <div className="space-y-2">
                                            <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                                            <Input id="cache-ttl" defaultValue="3600" />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="query-logging" />
                                            <Label htmlFor="query-logging">Enable Query Logging</Label>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="font-medium">Maintenance</h4>
                                    <div className="flex space-x-2">
                                        <Button variant="outline">Clear Cache</Button>
                                        <Button variant="outline">Optimize Database</Button>
                                        <Button variant="outline">Generate Logs</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
