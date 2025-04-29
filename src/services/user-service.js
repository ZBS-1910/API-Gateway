const { StatusCodes } = require("http-status-codes");
const { UserRepository,RoleRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Auth,Enums } = require("../utils/common");

const { JsonWebTokenError } = require("jsonwebtoken");
const userRepo = new UserRepository();
const roleRepo = new RoleRepository();


async function createuser(data) {
  try {
    const user = await userRepo.create(data);
    const role=  await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.CUSTOMER);
    user.addRole(role);
    return user;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new user object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function signin(data) {
  try {
    const user = await userRepo.getUserByEmail(data.email);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    const passwordMatch = Auth.checkPassword(data.password, user.password);
    if (!passwordMatch) {
      throw new AppError("Invalid password", StatusCodes.UNAUTHORIZED);
    }
    const jwt = Auth.createToken({ id: user.id, email: user.email });
    return jwt;
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.log("Service caught", error);
    throw new AppError(
      "Something went wrong",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function isAuthenticated(token) {
  try {
    if (!token) {
      throw new AppError("missing JWT tocken", StatusCodes.BAD_REQUEST);
    }
    const userData = Auth.verifyTocken(token);
    const user = await userRepo.getAll(userData.id);
    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }
    return user.id;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.name == JsonWebTokenError) {
      throw new AppError("Invalid JWT token", StatusCodes.UNAUTHORIZED);
    }
  }
}

async function addRoleUsers(data) {
  try{
    const user = await userRepo.getAll(id);

    if(!user){
      throw new AppError("No user found for the given id", StatusCodes.NOT_FOUND);
    }
    const role= await roleRepo.getRoleByName(data.role);
    if(!role){
      throw new AppError(" No use found for the given role ", StatusCodes.NOT_FOUND);
    }
    user.addRole(role);
    return user;
  }catch(error){
    if(error instanceof AppError)throw error;
    console.log(error);
    throw new AppError("Sothing went wrong", StatusCodes.INTERNAL_SERVER_ERROR);

  }
  
}

async function isAdmin(id){
  try{
    
    const user = await userRepo.get(id);
    if(!user){
      throw new AppError(" No use found for the given role ", StatusCodes.NOT_FOUND);
    }
    const adminrole= await roleRepo.getRoleByName(Enums.USER_ROLES_ENUMS.ADMIN);
    if(!role){
      throw new AppError(" No use found for the given role ", StatusCodes.NOT_FOUND);
    }
    return user.hasRole(adminrole);
  }catch(error){
    if(error instanceof AppError)throw error;
    console.log(error);
    throw new AppError("Sothing went wrong", StatusCodes.INTERNAL_SERVER_ERROR);

  }
  
}

module.exports = {
  createuser,
  signin,
  isAuthenticated,
  addRoleUsers,
  isAdmin
};
