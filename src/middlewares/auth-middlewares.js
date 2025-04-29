const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { UserService } = require("../services");
const { message } = require("../utils/common/error-response");



function validateAuthReqest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while autherizing user";
    ErrorResponse.error = new AppError(["email not found in the incoming request or correct form"],StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while autherizing user";
    ErrorResponse.error = new AppError(["password  not found in the incoming request or correct form"], StatusCodes.BAD_REQUEST);
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      req.headers["x-access-tocken"]
    );
    if (response) {
      req.user = response; //setting the user id in this obj
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(ErrorResponse);
  }
  
}

async function isAdmin(req,res,next){
  const response = await UserService.isAdmin(res.user)
  if(!response){
    return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({message:'User not authorized for this action'});

  }
  next();
}
module.exports = {
  validateAuthReqest,
  checkAuth,
  isAdmin
};
