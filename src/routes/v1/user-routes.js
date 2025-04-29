const express=require('express');
const router=express.Router();

const {UserController,InfoController}=require('../../controllers');
const{AuthMiddleware}=require('../../middlewares')


// api/v1/user/signup
router.post('/signup',
           // AuthMiddleware.validateAuthReqest,
            UserController.signup);


// api/v1/user/signin
router.post('/signin',
            AuthMiddleware.validateAuthReqest,
            UserController.signin);




module.exports=router;