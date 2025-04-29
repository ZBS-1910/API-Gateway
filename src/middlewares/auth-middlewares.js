const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { UserService } = require("../services");



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
module.exports = {
  validateAuthReqest,
  checkAuth,
};
