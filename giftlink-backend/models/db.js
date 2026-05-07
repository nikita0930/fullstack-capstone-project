require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = 'giftDB';

let dbInstance = null;

async function connectToDatabase() {
    try {
        const client = new MongoClient(url);

        // Task 1: Connect to MongoDB
        await client.connect();

        // Task 2: Connect to database giftDB
        dbInstance = client.db(dbName);

        // Task 3: Return database instance
        return dbInstance;

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

module.exports = connectToDatabase;
