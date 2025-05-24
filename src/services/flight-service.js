const axios = require('axios');
const { ServerConfig } = require('../../config/server-config');

const flightService = axios.create({
    baseURL: ServerConfig.FLIGHT_SERVICE,
    timeout: 5000
});

module.exports = {
    async getFlights(params) {
        try {
            const response = await flightService.get('/api/v1/flights', { params });
            return response.data;
        } catch (error) {
            throw new Error(`Flight service error: ${error.message}`);
        }
    },

    async getFlightById(id) {
        try {
            const response = await flightService.get(`/api/v1/flights/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Flight service error: ${error.message}`);
        }
    }
};
