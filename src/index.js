
const express = require('express');

const{ ServerConfig , Logger } = require('./config');

const apiroutes=require('./routes');
const logger = require('./config/logger-config');
const app = express();

app.use('/api',apiroutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`Server is Up and running on port ${ServerConfig.PORT}`);
    logger.info("Succefully started the server",{});
});