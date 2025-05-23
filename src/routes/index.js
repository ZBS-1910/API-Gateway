const express = require('express');

const { InfoController } = require('../controllers');
const userRouter = require('./v1/user-routes');
const router = express.Router();

router.get('/info', InfoController.info);

router.use('/user', userRouter)

module.exports = router;