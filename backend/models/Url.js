// models/Url.js
// Defines the Mongoose schema for the URL collection

import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    original_url: {
        type: String,
        required: true,
    },
    short_code: {
        type: String,
        required: true,
        unique: true,
    },
    visit_count: {
        type: Number,
        default: 0,
    },
}, {
    // Enable automatic creation of `createdAt` and `updatedAt` fields
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
