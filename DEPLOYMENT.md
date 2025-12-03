# Deployment Guide for AdminPanel to Shared Hosting

## Prerequisites

- Node.js and npm installed on your local machine
- Access to your shared hosting account (Hostinger)
- FTP client (like FileZilla) or access to the hosting file manager

## Build Process

1. **Build the project locally**

   ```bash
   # Navigate to your project directory
   cd path/to/AdminPanel
   
   # Install dependencies (if not already done)
   npm install
   
   # Build the project for static export
   npm run build
   ```

   This will create an `out` directory containing all the static files needed for deployment.

2. **Prepare the files for upload**

   The `out` directory contains all the files you need to upload to your shared hosting. Make sure the `.htaccess` file is included.

## Uploading to Shared Hosting

1. **Log in to your Hostinger account**

2. **Access the File Manager or use FTP**

   - If using the Hostinger File Manager: Navigate to the public_html directory
   - If using FTP: Connect to your hosting using the FTP credentials provided by Hostinger

3. **Upload the files**

   - Upload all contents from the `out` directory to the `public_html` directory (or a subdirectory if you want to host the admin panel in a specific path)
   - Make sure to include the `.htaccess` file

4. **Verify the deployment**

   - Visit your domain to check if the admin panel is working correctly
   - Test navigation between different pages

## Troubleshooting

### Common Issues

1. **404 errors when navigating**
   - Check if the `.htaccess` file was uploaded correctly
   - Ensure that mod_rewrite is enabled on your hosting

2. **Blank page or JavaScript errors**
   - Check the browser console for specific errors
   - Ensure all files were uploaded correctly

3. **Images not loading**
   - Verify that image paths are correct
   - Check if the image files were uploaded to the correct location

### Hostinger-Specific Settings

1. **PHP Version**: This is a static site, so PHP version shouldn't matter, but if you plan to add PHP functionality later, set it to the latest stable version.

2. **SSL Certificate**: If you have an SSL certificate, make sure to uncomment the HTTPS redirect in the `.htaccess` file.

## Limitations of Static Deployment

Please note that as a static deployment:

- Any server-side functionality (API routes, server components, etc.) will not work
- Dynamic data fetching will need to be handled client-side
- Authentication systems might need to be adjusted to work in a static context

When you're ready to move to a dynamic deployment with a VPS or cloud hosting, you'll be able to utilize all Next.js features fully.