const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes and Utils
const targetRoutes = require('./routes/targetRoutes');
const checkHealth = require('./utils/checker');

// 1. Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares (The "Logic" filters)
// --- UPDATED FOR CUSTOM SUBDOMAINS ---
app.use(cors({
    origin: [
        "https://monitor.simarpreet.in", // Your new custom frontend
        "https://infra-health-vanguard.vercel.app", // Keeping old Vercel for backup
        "http://localhost:5173" // For local development
    ], 
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
})); 

app.use(express.json()); // Parses incoming JSON data

// 3. Database Connection (The "Data" Tier link)
// Ensure MONGODB_URI matches your Render Environment settings
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
        
        // Start the background monitoring immediately after DB connects
        console.log('⏱️ Starting Initial Health Check...');
        checkHealth(); 
    })
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. API Endpoints
app.use('/api/targets', targetRoutes);

// Basic "Heartbeat" route for the server itself
app.get('/', (req, res) => {
    res.json({ 
        system: "Health Monitor API", 
        status: "Running",
        timestamp: new Date()
    });
});

// 5. Background Task (Automation)
setInterval(() => {
    console.log('--- Scheduled Health Check Triggered ---');
    checkHealth();
}, 60000);

// 6. Start Server
app.listen(PORT, () => {
    console.log(`🚀 Logic Tier is live`);
});
