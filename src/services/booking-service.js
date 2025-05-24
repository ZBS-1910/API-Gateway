const axios = require('axios');
const { ServerConfig } = require('../../config/server-config');

const bookingService = axios.create({
    baseURL: ServerConfig.BOOKING_SERVICE,
    timeout: 5000
});

module.exports = {
    async createBooking(bookingData) {
        try {
            const response = await bookingService.post('/api/v1/bookings', bookingData);
            return response.data;
        } catch (error) {
            throw new Error(`Booking service error: ${error.message}`);
        }
    },

    async getBookingById(id) {
        try {
            const response = await bookingService.get(`/api/v1/bookings/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(`Booking service error: ${error.message}`);
        }
    },

    async updateBooking(id, updateData) {
        try {
            const response = await bookingService.put(`/api/v1/bookings/${id}`, updateData);
            return response.data;
        } catch (error) {
            throw new Error(`Booking service error: ${error.message}`);
        }
    }
};
