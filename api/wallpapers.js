import { MongoClient, ServerApiVersion } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

// MongoDB connection string
// The password is URL-encoded in the environment variable
const uri = process.env.MONGODB_URI;

// Default wallpapers to initialize the database if empty
const defaultWallpapers = [
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

  // Check if MongoDB URI is available
  if (!uri) {
    console.error("MongoDB URI is not defined!");
    return res.status(500).json({ 
      success: false, 
      error: 'Database configuration error',
      message: 'MongoDB connection string is not defined' 
    });
  }

  // Create a MongoDB client
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to MongoDB");
    
    const database = client.db("wallify");
    const collection = database.collection("wallpapers");

    // GET request - return all wallpapers
    if (req.method === 'GET') {
      // Check if the collection is empty, if so initialize with defaults
      const count = await collection.countDocuments();
      if (count === 0) {
        console.log("Initializing wallpapers collection with defaults");
        await collection.insertMany(defaultWallpapers);
      }
      
      // Retrieve all wallpapers
      const wallpapers = await collection.find({}).toArray();
      
      return res.status(200).json({ 
        success: true, 
        wallpapers,
        timestamp: new Date().toISOString()
      });
    } 
    // POST request - update wallpapers
    else if (req.method === 'POST') {
      const { wallpapers } = req.body;
      
      if (!Array.isArray(wallpapers)) {
        return res.status(400).json({ success: false, error: 'Wallpapers must be an array' });
      }

      // Replace all wallpapers
      await collection.deleteMany({});
      await collection.insertMany(wallpapers);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Wallpapers updated successfully',
        count: wallpapers.length,
        timestamp: new Date().toISOString()
      });
    } 
    // Unsupported method
    else {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("MongoDB operation error:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Database operation failed',
      message: error.message 
    });
  } finally {
    // Close the connection when done
    await client.close();
    console.log("MongoDB connection closed");
  }
} 