import { v4 as uuidv4 } from 'uuid';

// In-memory storage (will be reset when serverless function restarts)
// In a production app, you would use a database
let wallpapersData = [];

export default async function handler(req, res) {
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
    try {
      // Return the wallpapers data
      res.status(200).json({ 
        success: true, 
        wallpapers: wallpapersData,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch wallpapers' });
    }
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
      
      res.status(200).json({ 
        success: true, 
        message: 'Wallpapers updated successfully',
        count: wallpapers.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating wallpapers:', error);
      res.status(500).json({ success: false, error: 'Failed to update wallpapers' });
    }
  } 
  // Unsupported method
  else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 