const dotenv = require('dotenv');

dotenv.config();

const defaultConfig = {
    PORT: process.env.PORT || 3000,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '24h',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    FLIGHT_SERVICE: process.env.FLIGHT_SERVICE || 'http://localhost:3001',
    BOOKING_SERVICE: process.env.BOOKING_SERVICE || 'http://localhost:3004',
    NOTI_SERVICE: process.env.NOTI_SERVICE || 'http://localhost:3003'
};

// Validate required environment variables
const requiredEnvVars = ['PORT', 'JWT_SECRET', 'FLIGHT_SERVICE', 'BOOKING_SERVICE', 'NOTI_SERVICE'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

module.exports = {
    ServerConfig: {
        ...defaultConfig,
        // Add validation for service URLs
        validateServiceUrls: () => {
            const services = ['FLIGHT_SERVICE', 'BOOKING_SERVICE', 'NOTI_SERVICE'];
            services.forEach(service => {
                if (!defaultConfig[service]) {
                    throw new Error(`Missing ${service} configuration`);
                }
                // Validate URL format
                if (!defaultConfig[service].startsWith('http://') && !defaultConfig[service].startsWith('https://')) {
                    throw new Error(`${service} must be a valid URL starting with http:// or https://`);
                }
            });
        }
    }
};
