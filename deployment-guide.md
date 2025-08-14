
# Arizona GLF - Deployment Guide

## Prerequisites Completed ✅
- Database credentials configured
- Email SMTP settings configured
- Domain configured for www.arizonaglf.com

## Deployment Steps for cPanel

### 1. Backend Deployment
1. Upload the entire `back end` folder to your cPanel file manager
2. Place it in your domain's root directory (usually `public_html`)
3. Navigate to the `back end` directory in cPanel terminal
4. Run: `composer install` to install PHPMailer

### 2. Database Setup
1. In cPanel MySQL, import the `setup/schema.sql` file
2. This creates all necessary tables with the default admin user

### 3. Frontend Build & Upload
1. In your local environment, run: `npm run build` in the frontend directory
2. Upload the generated `dist` folder contents to your cPanel `public_html` directory
3. Ensure the frontend files are in the root web directory

### 4. File Permissions
Set these permissions in cPanel File Manager:
- `back end/uploads/` → 755
- `back end/cache/` → 755
- `back end/logs/` → 755

### 5. Test Configuration
- Visit: https://www.arizonaglf.com
- Test contact form functionality
- Test admin login with: admin@arizonaglf.com / admin123

## Default Admin Credentials
- Email: admin@arizonaglf.com
- Password: admin123
- **Change this immediately after first login!**

## File Structure on cPanel
```
public_html/
├── index.html (React app)
├── assets/ (React build files)
├── back end/
│   ├── api/
│   ├── includes/
│   ├── uploads/
│   ├── cache/
│   └── vendor/ (after composer install)
```
