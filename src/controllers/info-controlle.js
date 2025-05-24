const { StatusCodes } = require('http-status-codes');

const info = (req, res) => 
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'API Gateways Service is live',
        error: {},
        data: {}
    });

module.exports = { info };
