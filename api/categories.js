// api/categories.js

// In-memory storage (will be reset when serverless function restarts)
// Note: For a production app, you'd use a database
let categoriesData = ["Nature", "Abstract", "Animals", "Space"];

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

  // GET request - return all categories
  if (req.method === 'GET') {
    return res.status(200).json({ 
      success: true, 
      categories: categoriesData,
      timestamp: new Date().toISOString()
    });
  } 
  // POST request - update categories
  else if (req.method === 'POST') {
    try {
      const { categories } = req.body;
      
      if (!Array.isArray(categories)) {
        return res.status(400).json({ success: false, error: 'Categories must be an array' });
      }
      
      // Update the categories data
      categoriesData = categories;
      
      return res.status(200).json({ 
        success: true, 
        message: 'Categories updated successfully',
        count: categories.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating categories:', error);
      return res.status(500).json({ success: false, error: 'Failed to update categories' });
    }
  } 
  // Unsupported method
  else {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
} 