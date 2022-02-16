require('dotenv').config()
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authentication = async(req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Autenticación inválida')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const userId = payload.userId
        if(req.body.userId !== userId) {
            throw new UnauthenticatedError('Autenticación inválidaa')
        } else {
            next()
        }
    } catch(error) {
        throw new UnauthenticatedError('Autenticación inválidaaa')
    }
}

module.exports = authentication