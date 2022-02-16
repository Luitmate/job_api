const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotfoundError } = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getAllJobs = async (req, res) => {
    res.send('all1 jobs')
}

const getJob = async (req, res) => {
    res.send('all2 jobs')
}

const createJob = async (req, res) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    const publisher = jwt.decode(token)
    const { company, position, created_by } = req.body
    const job = await Job.create({company, position, created_by: publisher})
    
    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    res.send('all jobs')
}

const deleteJob = async (req, res) => {
    res.send('all jobs')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}