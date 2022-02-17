const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { user } = require('pg/lib/defaults')

//byUser
const getAllJobs = async (req, res) => {
    const jobs = await Job.findAll({
        where: {
            created_by: req.user.userId
        },
        order: [
            ['created_at', 'DESC']
        ]
    })
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length})
}

const getJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.findByPk(id, {
        include: [{
            model: User,
            attributes: ['name']
        }] 
    })
    if(job === null) {
        throw new NotFoundError(`No se ha encontrado publicaciones con el id ${id}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    const { company, position, created_by } = req.body
    const job = await Job.create({company, position, created_by: req.user.userId})
    res.status(StatusCodes.OK).json({ job })
}

const updateJob = async (req, res) => {
    const { company, position } = req.body
    const { id } = req.params
    if(company === '' || position === '') {
        throw new BadRequestError('Los campos company y position no pueden estar vacíos')
    }
    const job = await Job.update({ company, position }, {
        where: {id}
    })
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { id } = req.params
    const job = await Job.destroy({
        where: { id }
    })
    if(job === null) {
        throw new NotFoundError(`No se ha encontrado publicaciones con el id ${id}`)
    }
    res.status(StatusCodes.OK).send({ job })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}