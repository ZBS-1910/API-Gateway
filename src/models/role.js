'use strict';
const { Model } = require('sequelize');
const { Enums } = require('../utils/common');
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = Enums.USER_ROLES_ENUMS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{through:'User_Roles',as:'user'})

    }
  }

  Role.init({
    name: {
      type: DataTypes.ENUM(ADMIN, CUSTOMER, FLIGHT_COMPANY),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};
