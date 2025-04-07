// api/categories.js

import { MongoClient, ServerApiVersion } from 'mongodb';

// MongoDB connection string from environment variable
const uri = process.env.MONGODB_URI;

// Default categories to initialize the database if empty
const defaultCategories = ["Nature", "Abstract", "Animals", "Space"];

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
    const collection = database.collection("categories");

    // GET request - return all categories
    if (req.method === 'GET') {
      // Check if the collection is empty, if so initialize with defaults
      const count = await collection.countDocuments();
      if (count === 0) {
        console.log("Initializing categories collection with defaults");
        await collection.insertOne({ 
          id: 'default',
          categories: defaultCategories
        });
      }
      
      // Retrieve categories
      const categoriesDoc = await collection.findOne({ id: 'default' }) || { categories: defaultCategories };
      
      return res.status(200).json({ 
        success: true, 
        categories: categoriesDoc.categories,
        timestamp: new Date().toISOString()
      });
    } 
    // POST request - update categories
    else if (req.method === 'POST') {
      const { categories } = req.body;
      
      if (!Array.isArray(categories)) {
        return res.status(400).json({ success: false, error: 'Categories must be an array' });
      }

      // Update or insert categories
      await collection.updateOne(
        { id: 'default' },
        { $set: { categories, updatedAt: new Date() } },
        { upsert: true }
      );
      
      return res.status(200).json({ 
        success: true, 
        message: 'Categories updated successfully',
        count: categories.length,
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