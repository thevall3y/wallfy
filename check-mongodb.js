// Script to test MongoDB connection and data operations
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("ERROR: MONGODB_URI is not defined in the .env file");
  process.exit(1);
}

console.log("MongoDB URI found in environment variables");
console.log("Connection string:", uri.substring(0, 20) + "..." + uri.substring(uri.indexOf("@")));

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    // Get database and collections
    const database = client.db("wallify");
    const wallpapersCollection = database.collection("wallpapers");
    const categoriesCollection = database.collection("categories");

    // Check if collections exist
    console.log("\nChecking collections...");
    const wallpapersCount = await wallpapersCollection.countDocuments();
    console.log(`Wallpapers collection: ${wallpapersCount} documents`);

    const categoriesCount = await categoriesCollection.countDocuments();
    console.log(`Categories collection: ${categoriesCount} documents`);

    // Get sample data
    console.log("\nFetching sample data...");
    if (wallpapersCount > 0) {
      const wallpaperSample = await wallpapersCollection.find().limit(1).toArray();
      console.log("Wallpaper sample:", JSON.stringify(wallpaperSample[0], null, 2));
    }

    if (categoriesCount > 0) {
      const categoriesSample = await categoriesCollection.find().limit(1).toArray();
      console.log("Categories sample:", JSON.stringify(categoriesSample[0], null, 2));
    }

    // Test data write and read
    console.log("\nTesting data operations...");
    const testDoc = {
      id: "test-" + Date.now(),
      title: "MongoDB Test",
      testTimestamp: new Date(),
    };

    // Insert test document
    console.log("Inserting test document...");
    const insertResult = await wallpapersCollection.insertOne(testDoc);
    console.log("Insert result:", insertResult);

    // Read back the test document
    console.log("Reading test document...");
    const foundDoc = await wallpapersCollection.findOne({ id: testDoc.id });
    console.log("Found document:", foundDoc);

    // Delete the test document
    console.log("Deleting test document...");
    const deleteResult = await wallpapersCollection.deleteOne({ id: testDoc.id });
    console.log("Delete result:", deleteResult);

    console.log("\nAll MongoDB tests completed successfully!");
  } catch (error) {
    console.error("MongoDB Error:", error);
    process.exit(1);
  } finally {
    // Close connection
    await client.close();
    console.log("MongoDB connection closed");
  }
}

run().catch(console.dir); 