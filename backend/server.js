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
// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
    origin: ["https://infra-health-vanguard.vercel.app", "http://localhost:5173"], 
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
    // Note: Render will ignore "localhost" and use its own dynamic port
    console.log(`🚀 Logic Tier is live`);
});
