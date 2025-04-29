const CrudRepository= require('./crud-repository');
const {Role}= require('../models');



 class roleRepository extends CrudRepository{
    constructor(){
        super(Role);
    }


    async getRoleByName(name){
        try{
            const role= await Role.findOne({where:{name:name}});
            return role;
        }catch(error){
            throw error;
        }
    }
 }


 module.exports=roleRepository;