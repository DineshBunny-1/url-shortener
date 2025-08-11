// routes/urlRoutes.js
// Handles all API routes for the application

import express from 'express';
import { shortenUrl, redirectToUrl, getAdminUrls } from '../controllers/urlController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create a new shortened URL
// @route   POST /api/shorten
// @access  Public
router.post('/api/shorten', shortenUrl);

// @desc    Get all URLs for the admin panel
// @route   GET /api/admin/urls
// @access  Private (requires token)
router.get('/api/admin/urls', protect, getAdminUrls);

// @desc    Redirect to the original URL
// @route   GET /:shortcode
// @access  Public
router.get('/:shortcode', redirectToUrl);

export default router;
