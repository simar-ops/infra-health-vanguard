const axios = require('axios');
const Target = require('../models/Target');

const checkHealth = async () => {
    const targets = await Target.find();
    
    targets.forEach(async (target) => {
        try {
            const start = Date.now();
            const response = await axios.get(target.url, { timeout: 5000 });
            const duration = Date.now() - start;

            target.status = response.status === 200 ? 'Up' : 'Issue';
            target.lastChecked = new Date();
            await target.save();
            
            console.log(`📡 Checked ${target.websiteName}: ${target.status} (${duration}ms)`);
        } catch (error) {
            target.status = 'Down';
            target.lastChecked = new Date();
            await target.save();
            console.log(`❌ Checked ${target.websiteName}: Down`);
        }
    });
};

module.exports = checkHealth;
