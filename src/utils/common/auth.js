const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const {ServerConfig}=require('../../config');


 function checkPassword(plainPassword,encryptedPassword){
    try{
        return bcrypt.compareSync(plainPassword,encryptedPassword);
    }catch(error){
        console.log(error);
        throw error;
    }
}
 function creteTocken(input){
    try{
        return jwt.sign(ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRES_IN });
    }catch(error){
        console.log(error);
        throw error;
    }

}

module.exports={
    checkPassword,
    creteTocken
}