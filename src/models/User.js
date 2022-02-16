const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/config')

class User extends Model {
  
}

User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
        notEmpty: {
          msg: 'El nombre no puede ser un campo vacío'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true
});

module.exports = User