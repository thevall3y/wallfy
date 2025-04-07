// Simple local server for Wallify app
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Request logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - Origin: ${req.headers.origin || 'N/A'}`);
  next();
});

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('./'));

// Data storage
const DATA_DIR = path.join(__dirname, 'data');
const WALLPAPERS_FILE = path.join(DATA_DIR, 'wallpapers.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

// Default data
const defaultWallpapers = [
  {
    id: 'nature-1',
    title: 'Mountain Lake',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    category: 'Nature',
    size: { width: 1080, height: 1920 },
    downloads: 128,
  },
  {
    id: 'abstract-1',
    title: 'Color Burst',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    category: 'Abstract',
    size: { width: 1080, height: 1920 },
    downloads: 243,
  },
  {
    id: 'space-1',
    title: 'Galaxy Clusters',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    category: 'Space',
    size: { width: 1080, height: 1920 },
    downloads: 328,
  }
];

const defaultCategories = ['Nature', 'Abstract', 'Space', 'Animals'];

// Ensure data directory exists
async function initializeDataStorage() {
  try {
    // Create data directory if it doesn't exist
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      console.log(`Created data directory at ${DATA_DIR}`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    // Initialize wallpapers file if it doesn't exist
    try {
      await fs.access(WALLPAPERS_FILE);
    } catch (err) {
      await fs.writeFile(WALLPAPERS_FILE, JSON.stringify(defaultWallpapers, null, 2));
      console.log('Created default wallpapers file');
    }

    // Initialize categories file if it doesn't exist
    try {
      await fs.access(CATEGORIES_FILE);
    } catch (err) {
      await fs.writeFile(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2));
      console.log('Created default categories file');
    }
  } catch (err) {
    console.error('Error initializing data storage:', err);
  }
}

// Special route for API status testing
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    status: 'API server is running',
    timestamp: new Date().toISOString(),
    requestInfo: {
      ip: req.ip,
      method: req.method,
      url: req.url,
      headers: req.headers
    }
  });
});

// API Routes
app.get('/api/wallpapers', async (req, res) => {
  try {
    const data = await fs.readFile(WALLPAPERS_FILE, 'utf8');
    const wallpapers = JSON.parse(data);
    
    res.json({
      success: true,
      wallpapers,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error reading wallpapers:', err);
    res.json({
      success: true,
      wallpapers: defaultWallpapers,
      timestamp: new Date().toISOString()
    });
  }
});

app.post('/api/wallpapers', async (req, res) => {
  try {
    const { wallpapers } = req.body;
    
    if (!Array.isArray(wallpapers)) {
      return res.status(400).json({
        success: false,
        error: 'Wallpapers must be an array'
      });
    }
    
    // Save wallpapers to file
    await fs.writeFile(WALLPAPERS_FILE, JSON.stringify(wallpapers, null, 2));
    
    res.json({
      success: true,
      message: 'Wallpapers updated successfully',
      count: wallpapers.length,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error saving wallpapers:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to save wallpapers',
      message: err.message
    });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, 'utf8');
    const categories = JSON.parse(data);
    
    res.json({
      success: true,
      categories,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error reading categories:', err);
    res.json({
      success: true,
      categories: defaultCategories,
      timestamp: new Date().toISOString()
    });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { categories } = req.body;
    
    if (!Array.isArray(categories)) {
      return res.status(400).json({
        success: false,
        error: 'Categories must be an array'
      });
    }
    
    // Save categories to file
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));
    
    res.json({
      success: true,
      message: 'Categories updated successfully',
      count: categories.length,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error saving categories:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to save categories',
      message: err.message
    });
  }
});

// Start server
async function startServer() {
  await initializeDataStorage();
  
  app.listen(PORT, () => {
    console.log(`\n=== Wallify Local Server ===`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`- Main site: http://localhost:${PORT}/index.html`);
    console.log(`- Admin panel: http://localhost:${PORT}/admin.html`);
    console.log(`- API endpoints:`);
    console.log(`  * GET & POST http://localhost:${PORT}/api/wallpapers`);
    console.log(`  * GET & POST http://localhost:${PORT}/api/categories`);
    console.log(`\nData is stored in the ./data directory`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
  });
}

startServer(); 