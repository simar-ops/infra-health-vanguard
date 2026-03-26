const mongoose = require('mongoose');

const TargetSchema = new mongoose.Schema({
    websiteName: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        default: "Pending" // Will be updated to 'Up' or 'Down' later
    },
    lastChecked: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Target', TargetSchema);
