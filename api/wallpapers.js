import { v4 as uuidv4 } from 'uuid';

// In-memory storage (will be reset when serverless function restarts)
// Note: For a production app, you'd use a database like MongoDB, Fauna, or Supabase
let wallpapersData = [
  // Nature wallpapers
  {
    id: 'nature-1',
    title: 'Mountain Lake',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Nature',
    size: { width: 1080, height: 1920 },
    downloads: 128,
  },
  {
    id: 'nature-2',
    title: 'Forest Path',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969',
    category: 'Nature',
    size: { width: 1080, height: 1920 },
    downloads: 95,
  },
  {
    id: 'nature-3',
    title: 'Autumn Colors',
    imageUrl: 'https://images.unsplash.com/photo-1507783548227-544c3b8fc065',
    category: 'Nature',
    size: { width: 1080, height: 1920 },
    downloads: 152,
  },
  // Abstract wallpapers
  {
    id: 'abstract-1',
    title: 'Color Burst',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    category: 'Abstract',
    size: { width: 1080, height: 1920 },
    downloads: 243,
  },
  // Space wallpapers
  {
    id: 'space-1',
    title: 'Galaxy Clusters',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    category: 'Space',
    size: { width: 1080, height: 1920 },
    downloads: 328,
  }
];

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // GET request - return all wallpapers
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      wallpapers: wallpapersData,
      timestamp: new Date().toISOString()
    });
  } 
  // POST request - update wallpapers
  else if (req.method === 'POST') {
    try {
      const { wallpapers } = req.body;
      
      if (!Array.isArray(wallpapers)) {
        return res.status(400).json({ success: false, error: 'Wallpapers must be an array' });
      }
      
      // Update the wallpapers data
      wallpapersData = wallpapers;
      
      return res.status(200).json({ 
        success: true, 
        message: 'Wallpapers updated successfully',
        count: wallpapers.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating wallpapers:', error);
      return res.status(500).json({ success: false, error: 'Failed to update wallpapers' });
    }
  } 
  // Unsupported method
  else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 