require('dotenv').config()
const jwt = require('jsonwebtoken');
const ExpressError = require('../errors/ExpressError');

// const authentication = async(req, res, next) => {
//     const authHeader = req.headers.authorization
//     if(!authHeader || !authHeader.startsWith('Bearer')) {
//         throw new ExpressError('Autenticación inválida')
//     }
//     const token = authHeader.split(' ')[1]

//     try {
//         const payload = jwt.verify(token, process.env.JWT_SECRET)
//         const userId = payload.userId
//         const createdBy = jwt.decode(token)
//         if(req.body.userId !== userId) {
//             throw new ExpressError('Autenticación inválida')
//         } else {
//             req.user = { userId: createdBy }
//             next()
//         }
//     } catch(error) {
//         throw new ExpressError('Autenticación inválida')
//     }
// }

// module.exports = authentication

const authentication = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            throw new ExpressError('Autenticación inválida')
        }
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.userId
        const createdBy = jwt.decode(token)
        if(req.body.userId !== userId) {
            throw new ExpressError('Autenticación inválida')
        } else {
            req.user = { userId: createdBy }
            next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication