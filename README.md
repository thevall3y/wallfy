# Wallify - Modern Wallpaper App

A modern, responsive wallpaper application built with HTML, CSS, and JavaScript.

## Features

- Browse wallpapers by category
- Download wallpapers directly to your device
- Dark mode support
- Responsive design for all devices
- Admin panel for managing wallpapers and categories

## Deployment to Vercel

This project is configured for easy deployment to Vercel. Follow these steps to deploy:

1. **Install Vercel CLI** (if you haven't already):
   ```
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```
   vercel login
   ```

3. **Deploy the project**:
   ```
   vercel
   ```

4. **For production deployment**:
   ```
   vercel --prod
   ```

## API Endpoints

The application uses the following API endpoints:

- `/api/wallpapers` - GET and POST endpoints for managing wallpapers
- `/api/categories` - GET and POST endpoints for managing categories

## Local Development

To run the project locally:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Project Structure

- `index.html` - Main application
- `admin.html` - Admin panel for managing wallpapers and categories
- `api/` - API endpoints for the application
- `assets/` - Static assets like images and icons

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript (ES6+)
- Vercel for deployment and API hosting

## License

MIT 