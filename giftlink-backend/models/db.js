// db.js

require('dotenv').config();
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = process.env.MONGO_URL;

// Database instance
let dbInstance = null;

// Database name
const dbName = "giftsdb";

async function connectToDatabase() {

    // Return existing instance if already connected
    if (dbInstance) {
        return dbInstance;
    }

    try {

        // Create MongoDB client
        const client = new MongoClient(url);

        // Connect to MongoDB
        await client.connect();

        console.log("Connected to MongoDB");

        // Select database
        dbInstance = client.db(dbName);

        return dbInstance;

    } catch (error) {

        console.error("Failed to connect to DB", error);
        throw error;
    }
}

module.exports = connectToDatabase;
