const mongoose = require('mongoose');
const shortid = require('shortid');

const ShortUrl_schema = mongoose.model('ShortUrl', new mongoose.Schema({
    full: {
        type: String,
        required: true
    },

    short: {
        type: String,
        required: true,
        default: shortid.generate
    },

    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}));

module.exports = ShortUrl_schema;