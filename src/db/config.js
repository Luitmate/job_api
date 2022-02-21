require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_URI,
    {
        ssl: { rejectUnauthorized: false }
        
    }
)

// const sequelize = new Sequelize(
//     process.env.DB_URI,{
//         dialect: "postgres",
//         dialectOptions: {
//             ssl: {
//               require: true,
//               rejectUnauthorized: false
//             }
//         }
//     }
// )
  
    

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT
//     }, {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
    
// )

module.exports = sequelize