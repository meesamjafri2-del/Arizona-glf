# Arizona GLF Web Platform

A comprehensive React + Tailwind (Vite) application integrated with a secure PHP 8.x + MySQL backend. Features include client/admin authentication, dashboards, file uploads, an admin file manager, and a contact form, all connected via documented REST-style endpoints.

## Features

### 🔐 **Authentication & Security**
- Role-based access control (Client/Admin)
- Secure session management with CSRF protection
- Password hashing with bcrypt
- Session timeout handling

### 📊 **Dashboard System**
- **Client Dashboard**: File management, upload tracking, account overview
- **Admin Portal**: User management, system statistics, file administration
- Real-time activity monitoring
- Responsive design for all devices

### 📁 **File Management**
- Secure file uploads with virus scanning support
- File type validation (Images, PDFs, Documents, Archives)
- Per-user storage quotas (configurable)
- File sharing capabilities
- Download tracking and analytics

### 👥 **User Management**
- User registration and profile management
- Admin user controls (activate/deactivate, delete)
- Activity logging and audit trails
- Email verification system

### 📞 **Contact System**
- Contact form with message categorization
- Admin message management interface
- Priority and status tracking
- Response tracking

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **React Router** for navigation
- Custom API hooks for backend communication

### Backend
- **PHP 8.x** with object-oriented architecture
- **MySQL** database with optimized schema
- **PDO** for secure database operations
- RESTful API design
- CSRF protection and session security

## Quick Start

### Prerequisites
- Node.js 16+ and npm/yarn
- PHP 8.0+ with extensions: pdo, pdo_mysql, json, mbstring, openssl
- MySQL 5.7+ or MariaDB 10.3+
- Web server (Apache/Nginx) for production

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arizona-glf-platform
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   # Update database credentials in back end/config.php
   # Run database setup
   cd "back end"
   php setup/setup.php
   
   # Start PHP development server (for testing)
   php -S localhost:8000 index.php
   ```

4. **Configure Development Environment**
   - Frontend runs on: `http://localhost:5173`
   - Backend API runs on: `http://localhost:8000`
   - The Vite proxy automatically forwards `/api/*` requests to the backend

### Demo Accounts

After running the database setup, you can use these demo accounts:

- **Admin Access**: `admin@demo.com` / `password`
- **Client Access**: `client@demo.com` / `password`

## Project Structure

```
arizona-glf-platform/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React context providers
│   │   ├── api/               # API service hooks
│   │   └── assets/            # Static assets
│   ├── public/                # Public assets
│   └── package.json           # Frontend dependencies
├── back end/                   # PHP backend application
│   ├── api/                   # API endpoints
│   │   ├── auth/              # Authentication endpoints
│   │   ├── client/            # Client-specific endpoints
│   │   └── admin/             # Admin-specific endpoints
│   ├── includes/              # Shared PHP classes
│   ├── setup/                 # Database setup scripts
│   ├── config.php             # Configuration file
│   └── index.php              # Main router
└── uploads/                   # File storage directory
    ├── clients/               # User files organized by user ID
    └── admin_files/           # Admin-managed files
```

## Configuration

### Environment Variables

Update `back end/config.php` with your settings:

```php
// Database
define('DB_HOST', 'your-host');
define('DB_NAME', 'your-database');
define('DB_USER', 'your-username');
define('DB_PASS', 'your-password');

// Security (change these in production!)
define('JWT_SECRET', 'your-jwt-secret');
define('CSRF_SECRET', 'your-csrf-secret');

// File upload limits
define('MAX_FILE_SIZE', 50 * 1024 * 1024); // 50MB
```

### Frontend Proxy Configuration

The Vite development server is configured to proxy API requests to the backend. Update `frontend/vite.config.ts` if needed:

```typescript
server: {
  proxy: {
    '/api': 'http://localhost:8000'
  }
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/check` - Check authentication status
- `POST /api/auth/logout` - User logout
- `GET /api/csrf-token` - Get CSRF token

### Files
- `POST /api/files/upload` - Upload file
- `GET /api/files/list` - List user files
- `DELETE /api/files/delete/{id}` - Delete file
- `GET /api/files/download/{id}` - Download file

### Admin
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/users` - User management
- `GET /api/admin/files` - File management
- `PUT /api/admin/users/{id}/status` - Update user status

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/admin/contact/messages` - List messages (admin)

## Security Features

- **CSRF Protection**: All state-changing requests require valid CSRF tokens
- **SQL Injection Prevention**: PDO prepared statements throughout
- **XSS Protection**: Input sanitization and output encoding
- **File Upload Security**: Type validation, size limits, virus scanning support
- **Session Security**: HTTP-only cookies, secure flags, strict same-site policy
- **Password Security**: bcrypt hashing with salt

## Deployment

### Production Checklist

1. **Security**
   - [ ] Change default JWT and CSRF secrets
   - [ ] Update demo account passwords
   - [ ] Enable HTTPS
   - [ ] Configure proper CORS origins
   - [ ] Disable PHP error display

2. **Performance**
   - [ ] Build frontend: `npm run build`
   - [ ] Enable PHP OPcache
   - [ ] Configure web server caching
   - [ ] Optimize database indexes

3. **Monitoring**
   - [ ] Set up error logging
   - [ ] Configure backup systems
   - [ ] Monitor disk space (uploads directory)

### Apache Configuration Example

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /path/to/arizona-glf-platform/frontend/dist
    
    # API proxy to PHP backend
    ProxyPass /api/ http://localhost:8000/api/
    ProxyPassReverse /api/ http://localhost:8000/api/
    
    # Static file serving
    Alias /uploads /path/to/arizona-glf-platform/uploads
    <Directory "/path/to/arizona-glf-platform/uploads">
        Require all denied
        # Only allow downloads through the API
    </Directory>
    
    # Security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    
    SSLEngine on
    SSLCertificateFile /path/to/certificate.crt
    SSLCertificateKeyFile /path/to/private.key
</VirtualHost>
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For technical support or questions:
- Email: support@arizonaglf.com
- Documentation: [Platform Docs](https://your-docs-url.com)

---

**Arizona GLF Platform** - Built with ❤️ for secure, scalable business management.
