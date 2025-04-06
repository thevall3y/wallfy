# Wallify

A modern wallpaper gallery app with an admin panel for managing wallpapers and categories.

## Features

- Browse wallpapers by category
- View wallpaper details and download
- Admin panel for managing wallpapers and categories
- Upload images directly or use URLs
- Dark/light mode toggle
- Responsive design for all devices

## Deployment with Vercel

Follow these steps to deploy Wallify to Vercel:

1. **Install the Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

## Local Development

To run the project locally:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. Open your browser and visit `http://localhost:3000`

## How It Works

- The app uses client-side JavaScript and localStorage to manage data
- Images can be uploaded directly and are stored as base64 strings
- No backend server is required for basic functionality
- All changes in the admin panel are automatically reflected in the main site

## License

MIT 