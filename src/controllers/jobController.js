const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotfoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    res.send('all1 jobs')
}

const getJob = async (req, res) => {
    res.send('all2 jobs')
}

const createJob = async (req, res) => {
    const { company, position } = req.body
    const job = await Job.create({company, position})
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