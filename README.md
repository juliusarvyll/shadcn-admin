# Laravel Admin Template with shadcn/ui

A modern, responsive admin dashboard built with Laravel, Inertia.js, React, TypeScript, and shadcn/ui components.

## 🚀 Features

### Core Features
- **Laravel 12** - Latest Laravel framework with modern PHP features
- **Inertia.js** - SPA-like experience without API complexity
- **React 19** - Latest React with TypeScript support
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **TypeScript** - Type-safe development experience

### Admin Features
- **Dashboard** - Comprehensive overview with statistics and charts
- **User Management** - Complete CRUD operations for users
- **Analytics** - Data visualization and performance metrics
- **Reports** - Generate and export various reports
- **Activity Logs** - Real-time system activity monitoring
- **Settings** - Comprehensive application configuration
- **Responsive Design** - Works perfectly on all devices

### UI Components
- **Data Tables** - Sortable, filterable, and paginated tables
- **Forms** - Validation, error handling, and accessibility
- **Charts** - Data visualization components (placeholder for integration)
- **Navigation** - Collapsible sidebar with breadcrumbs
- **Modals & Dialogs** - Modal windows and confirmation dialogs
- **Notifications** - Toast notifications and alerts
- **Theme Support** - Light/dark mode with system preference detection

## 📋 Requirements

- PHP 8.2+
- Node.js 18+
- Composer
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shadcn-admin
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

6. **Build assets**
   ```bash
   npm run build
   ```

7. **Start the development server**
   ```bash
   php artisan serve
   npm run dev
   ```

## 🏗️ Project Structure

```
├── app/                    # Laravel application logic
├── resources/
│   ├── js/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   └── ...        # Custom components
│   │   ├── pages/         # Inertia.js pages
│   │   ├── layouts/       # Page layouts
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── css/               # Stylesheets
│   └── views/             # Blade templates
├── routes/                # Laravel routes
├── database/              # Migrations and seeders
└── config/                # Configuration files
```

## 🎨 UI Components

### Available shadcn/ui Components
- **Button** - Various button styles and states
- **Card** - Content containers with headers
- **Input** - Form input fields
- **Select** - Dropdown select components
- **Table** - Data table with sorting and pagination
- **Dialog** - Modal windows
- **Dropdown Menu** - Context menus
- **Badge** - Status indicators
- **Avatar** - User profile images
- **Switch** - Toggle controls
- **Tabs** - Tabbed content organization
- **Separator** - Visual dividers
- **Tooltip** - Hover information
- **Checkbox** - Form checkboxes
- **Label** - Form labels

### Custom Components
- **DataTable** - Advanced table with filtering and pagination
- **AppLayout** - Main application layout
- **AppSidebar** - Navigation sidebar
- **AppHeader** - Top navigation bar
- **Breadcrumbs** - Navigation breadcrumbs

## 📱 Pages

### Dashboard (`/dashboard`)
- Statistics cards with metrics
- Recent activity feed
- Quick action buttons
- System status indicators

### Users (`/users`)
- User listing with data table
- User creation form
- User editing and management
- Role and status management

### Analytics (`/analytics`)
- Performance metrics
- Traffic overview charts
- User activity patterns
- Top pages and sources

### Reports (`/reports`)
- Report generation
- Export functionality
- Scheduled reports
- Report history

### Activity (`/activity`)
- System activity logs
- User action tracking
- Real-time updates
- Security event monitoring

### Settings (`/settings`)
- General application settings
- Security configuration
- Appearance customization
- Notification preferences
- Third-party integrations
- Advanced system settings

## 🔧 Configuration

### Environment Variables
```env
APP_NAME="Admin Dashboard"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin_dashboard
DB_USERNAME=root
DB_PASSWORD=
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom configuration for shadcn/ui components.

### shadcn/ui Configuration
Located in `components.json` with custom aliases and styling preferences.

## 🚀 Development

### Adding New Components
```bash
npx shadcn@latest add [component-name]
```

### Creating New Pages
1. Create a new React component in `resources/js/pages/`
2. Add the route in `routes/web.php`
3. Update navigation in `resources/js/components/app-sidebar.tsx`

### Styling
- Use Tailwind CSS classes for styling
- Follow shadcn/ui design patterns
- Maintain consistent spacing and typography

### TypeScript
- All components are written in TypeScript
- Define types in `resources/js/types/`
- Use proper type annotations for props and state

## 📦 Building for Production

```bash
# Build assets
npm run build

# Optimize for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 🔒 Security

- CSRF protection enabled
- XSS prevention
- SQL injection protection
- Authentication middleware
- Role-based access control
- Input validation and sanitization

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run frontend tests
npm run test
```

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the Laravel and shadcn/ui documentation

## 🔄 Updates

To update dependencies:
```bash
# Update PHP dependencies
composer update

# Update Node.js dependencies
npm update

# Update shadcn/ui components
npx shadcn@latest update
```

---

Built with ❤️ using Laravel, React, and shadcn/ui
