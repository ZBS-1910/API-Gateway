const axios = require('axios');
const { ServerConfig } = require('../../config/server-config');

const notificationService = axios.create({
    baseURL: ServerConfig.NOTI_SERVICE,
    timeout: 5000
});

module.exports = {
    async sendNotification(notificationData) {
        try {
            const response = await notificationService.post('/api/v1/notifications', notificationData);
            return response.data;
        } catch (error) {
            throw new Error(`Notification service error: ${error.message}`);
        }
    },

    async getNotifications(params) {
        try {
            const response = await notificationService.get('/api/v1/notifications', { params });
            return response.data;
        } catch (error) {
            throw new Error(`Notification service error: ${error.message}`);
        }
    }
};
