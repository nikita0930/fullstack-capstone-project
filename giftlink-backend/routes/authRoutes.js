const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const dotenv = require('dotenv');
const pino = require('pino');

const router = express.Router();
const logger = pino();

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * =========================
 * REGISTER ROUTE
 * =========================
 */
router.post('/register', async (req, res) => {
    try {

        // Connect to MongoDB
        const db = await connectToDatabase();

        // Access users collection
        const collection = db.collection("users");

        // Check if email already exists
        const existingEmail = await collection.findOne({
            email: req.body.email
        });

        if (existingEmail) {
            logger.error('Email already exists');
            return res.status(400).json({
                error: 'Email already exists'
            });
        }

        // Generate salt and hash password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);

        // Insert new user
        const newUser = await collection.insertOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            createdAt: new Date(),
        });

        // JWT payload
        const payload = {
            user: {
                id: newUser.insertedId.toString(),
            },
        };

        // Create auth token
        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');

        res.json({
            authtoken,
            email: req.body.email
        });

    } catch (e) {
        logger.error(e);
        return res.status(500).send('Internal server error');
    }
});


/**
 * =========================
 * LOGIN ROUTE
 * =========================
 */
router.post('/login', async (req, res) => {

    try {

        // Task 1: Connect to giftsdb
        const db = await connectToDatabase();

        // Task 2: Access users collection
        const collection = db.collection("users");

        // Task 3: Check user credentials
        const theUser = await collection.findOne({
            email: req.body.email
        });

        // Task 7: User not found
        if (!theUser) {
            logger.error('User not found');

            return res.status(404).json({
                error: 'User not found'
            });
        }

        // Task 4: Compare passwords
        const result = await bcryptjs.compare(
            req.body.password,
            theUser.password
        );

        if (!result) {
            logger.error('Passwords do not match');

            return res.status(404).json({
                error: 'Wrong password'
            });
        }

        // Task 5: Fetch user details
        const userName = theUser.firstName;
        const userEmail = theUser.email;

        // Task 6: Create JWT token
        const payload = {
            user: {
                id: theUser._id.toString(),
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User logged in successfully');

        // Send response
        res.json({
            authtoken,
            userName,
            userEmail
        });

    } catch (e) {

        logger.error(e);

        return res.status(500).send('Internal server error');
    }
});

module.exports = router;
