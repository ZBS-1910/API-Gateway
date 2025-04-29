const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

function checkPassword(plainPassword, encryptedPassword) {
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function createToken(input) {
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.error("Error while creating token:", error);
    throw error;
  }
}
function verifyTocken(token) {
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    console("Auth cought", error);
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyTocken,
};
