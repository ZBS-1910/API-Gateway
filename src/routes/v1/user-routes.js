const express = require('express');
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');
const router = express.Router();

router.post('/signup',
            AuthMiddleware.validateAuthReqest,
            UserController.signup);
router.post('/signin',
            AuthMiddleware.validateAuthReqest,
            UserController.signin);
//router.post('/role',,AuthMiddleware.validateAuthReqest, AuthRequestMiddlewares.isAdmin, UserController.addRoleToUser);
module.exports = router;