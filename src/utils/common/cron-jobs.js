const schedule = require('node-cron');

module.exports = {
    scheduleCrons: () => {
        schedule.schedule('*/5 * * * * *', () => {
            console.log('Running cron job every 5 seconds...');
        });
    }
};
