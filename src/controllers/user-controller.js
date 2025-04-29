const {UserService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');

/**
 * POST : /signup
 * req-body{email: 'abc@.com', password: 'abc123'}
 * 
 */
async function signup(req,res){
    try{
        const user= await UserService.createuser({
            email:req.body.email,
            password:req.body.password
        });
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
   }
}
async function signin(req,res){
    try{
        const user= await UserService.signin({
            email:req.body.email,
            password:req.body.password
        });
        SuccessResponse.data=user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
   }
}

async function addRoleToUsers(req, res) {
    try {
        const user = await UserService.addRoletoUser({
            role: req.body.role,
            id: req.body.id
        });
        SuccessResponse.data = user;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    signup,
    signin,
    addRoleToUsers

}