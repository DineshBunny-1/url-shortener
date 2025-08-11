// controllers/urlController.js
// Contains the logic for handling route requests

import Url from '../models/Url.js';
import { generateShortCode } from '../utils/generateShortCode.js';

// --- Helper function to validate URL format ---
const isValidUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (error) {
        return false;
    }
};

// --- Controller to shorten a URL ---
export const shortenUrl = async (req, res) => {
    const { original_url } = req.body;
    const base_url = process.env.BASE_URL;

    // Validate the original URL
    if (!isValidUrl(original_url)) {
        return res.status(400).json({ error: 'Invalid URL format provided.' });
    }

    try {
        // Check if the URL has already been shortened
        let url = await Url.findOne({ original_url });

        if (url) {
            // If it exists, return the existing short URL
            return res.status(200).json({ short_url: `${base_url}/${url.short_code}` });
        } else {
            // If it doesn't exist, create a new short code
            const short_code = generateShortCode();
            
            // Create a new URL document
            url = new Url({
                original_url,
                short_code,
            });

            await url.save();

            // Return the new short URL
            res.status(201).json({ short_url: `${base_url}/${url.short_code}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
};

// --- Controller to redirect to the original URL ---
export const redirectToUrl = async (req, res) => {
    try {
        const { shortcode } = req.params;
        
        // Find the URL by its short code
        const url = await Url.findOne({ short_code: shortcode });

        if (url) {
            // Increment the visit count
            url.visit_count++;
            await url.save();
            
            // Redirect to the original URL
            return res.redirect(301, url.original_url);
        } else {
            // If not found, return a 404 error
            return res.status(404).json({ error: 'Short URL not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
};

// --- Controller for Admin Panel to get all URLs ---
export const getAdminUrls = async (req, res) => {
    try {
        // Fetch all URLs from the database, sorting by creation date
        const urls = await Url.find({}).sort({ created_at: -1 });
        res.status(200).json(urls);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error while fetching URLs.' });
    }
};
