// server.js
// Main entry point for the application

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import urlRoutes from './routes/urlRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) for frontend integration
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- Routes ---
app.use('/', urlRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
