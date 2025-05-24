const express = require('express');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const { ServerConfig } = require('./config/server-config');
const apiRoutes= require('./routes')
// Validate service URLs before starting the server
ServerConfig.validateServiceUrls();

const app = express();

// Middleware
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 30, // Limit each IP to 30 requests per 2 minutes
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

// Proxy configurations
const proxyOptions = {
    changeOrigin: true,
    secure: false,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).json({
            error: 'Service unavailable',
            details: err.message
        });
    },
    onProxyRes: (proxyRes) => {
        // Log response status for debugging
        console.log(`Proxy response status: ${proxyRes.statusCode}`);
    }
};

// Flight Service Proxy
app.use('/flightService', createProxyMiddleware({
    ...proxyOptions,
    target: ServerConfig.FLIGHT_SERVICE,
    pathRewrite: {'^/flightService' : '/flightService'}
}));

// Booking Service Proxy
app.use('/bookingsService', createProxyMiddleware({
    ...proxyOptions,
    target: ServerConfig.BOOKING_SERVICE,
    pathRewrite: {'^/bookingsService' : '/bookingsService'}
}));

// Notification Service Proxy
app.use('/notifService', createProxyMiddleware({
    ...proxyOptions,
    target: ServerConfig.NOTI_SERVICE,
    pathRewrite: {'^/notifService' : '/notifService'}
}));

app.use('/api',apiRoutes)
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('API Gateway Error:', err.stack);
    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: err.message,
        timestamp: new Date().toISOString()
    });
});

// Start server
const PORT = ServerConfig.PORT;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log('Available services:');
    console.log(`- Flight Service: ${ServerConfig.FLIGHT_SERVICE}`);
    console.log(`- Booking Service: ${ServerConfig.BOOKING_SERVICE}`);
    console.log(`- Notification Service: ${ServerConfig.NOTI_SERVICE}`);
});