# Wallify - Modern Wallpaper Web App

A modern responsive wallpaper web app built with React, Next.js, and Tailwind CSS.

## Features

- Grid layout displaying wallpaper images in a clean, aesthetic way
- Category filters (Nature, Abstract, Animals, Space)
- Dark/light mode toggle
- Hover effects on wallpapers (zoom in and overlay)
- Modal for fullscreen preview when a wallpaper is clicked
- Responsive design for all devices

## Project Structure

```
wallfy/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── CategorySidebar.tsx
│   │   ├── Header.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── WallpaperCard.tsx
│   │   ├── WallpaperGrid.tsx
│   │   └── WallpaperModal.tsx
│   ├── data/
│   │   └── wallpapers.ts
│   └── lib/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Setup and Installation

1. Install [Node.js](https://nodejs.org/)
2. Clone the repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Enhancements

- Connect to an API or CMS for dynamic wallpaper content
- Add search functionality
- Implement user accounts for favorites/collections
- Add download functionality for wallpapers
- Implement pagination or infinite scroll for large wallpaper collections

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- next-themes 