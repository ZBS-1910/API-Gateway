
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const{ ServerConfig} = require('./config');
const rateLimit =require( 'express-rate-limit')
const apiroutes=require('./routes');
const logger = require('./config/logger-config');
const app = express();

const limiter=rateLimit({
    windowMs:2*60*1000, // 2 minutes
    max:100, // limit each IP to 10 requests per windowMs 2 minutes
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(limiter);
app.use('/api',apiroutes);
app.use('/flightsService/api',apiroutes);


app.use('/flightsService',createProxyMiddleware({target:ServerConfig.FLIGHT_SERVICE,changeOrigin:true}));
app.use('//bookingService',createProxyMiddleware({target:ServerConfig.BOOKING_SERVICE,changeOrigin:true}));

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is Up and running on port ${ServerConfig.PORT}`);
    logger.info("Succefully started the server",{});
});


/**
 *       user
 *        |
 *        v
 * localhost:3000(API Gateway)
 *        |
 *        v
 * localhost:3000/api/v1/flights 
 * 
 *  */