 const CrudRepository= require('./crud-repository');
const {User}= require('../models');
const { where } = require('sequelize');



 class userRepository extends CrudRepository{
    constructor(){
        super(User);
    }


    async getUserByEmail(email){
        try{
            const user= await this.model.findOne({where:{email:email}});
            return user;
        }catch(error){
            throw error;
        }
    }
 }


 module.exports=userRepository;