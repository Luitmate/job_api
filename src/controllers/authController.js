require('dotenv').config();
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { name, email, password } = req.body
    const passwordEncrypted = await passwordEncryption(password)
    const user = await User.create({ name, email, password: passwordEncrypted})
    const token = signToken(user.id, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
    res.status(StatusCodes.CREATED).json({ user: {name:user.name}, token})
}

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    const check = await passwordComparison(password, user.password)
    if(check) {
        const token = signToken(user.id, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })
        res.status(StatusCodes.OK).json({ user: {name:user.name}, token })
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