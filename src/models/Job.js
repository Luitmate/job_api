const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/config')

class Job extends Model {
    static associate({ User }) {
        
    }
}

Job.init({
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre no puede ser un campo vacío'
        }
      }
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
            msg: 'La posición no puede ser un campo vacío'
        }
      }
    },
    status: {
      type: DataTypes.ENUM("interview", "declined", "pending"),
      defaultValue: "pending",
    }
}, {
  sequelize,
  modelName: 'Job',
  tableName: 'jobs',
  underscored: true
});

module.exports = Job