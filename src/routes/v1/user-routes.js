const express=require('express');
const router=express.Router();

const {UserController}=require('../../controllers');
const{AuthMiddleware}=require('../../middlewares')

router.post('/signup',
            AuthMiddleware.validateAuthReqest,
            UserController.signup
        );
router.post('/signin',
            AuthMiddleware.validateAuthReqest,
            UserController.signin
        );




module.exports=router;