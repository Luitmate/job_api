require('dotenv').config();
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const ExpressError = require('../errors/ExpressError')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const passwordEncrypted = await passwordEncryption(password)
        const user = await User.create({ name, email, password: passwordEncrypted})
        const token = signToken(user.id, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })
        res.status(StatusCodes.CREATED).json({ user: {name:user.name}, token})
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
               email: email
            }
        })
        if(!user) {
            throw new ExpressError('Datos inválidos', StatusCodes.NOT_FOUND)
        }
        const check = await passwordComparison(password, user.password)
        if(check) {
            const token = signToken(user.id, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_LIFETIME
            })
            res.status(StatusCodes.OK).json({ user: {name:user.name}, token })
        } else {
                throw new ExpressError('Datos inválidos', StatusCodes.UNAUTHORIZED)
            }
    } catch (error) {
        next(error)
    }   
}

const passwordEncryption = async (passwordPlain) => {
    return await bcrypt.hash(passwordPlain, 10)
}

const passwordComparison = async (passwordInput, userPassword) => {
    return await bcrypt.compare(passwordInput, userPassword)
}

const signToken = (userId, jwtoken) => {
    return jwt.sign(userId, jwtoken)
}

module.exports = {
    register,
    login
}