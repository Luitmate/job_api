const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const { user } = require('pg/lib/defaults')
const ExpressError = require('../errors/ExpressError')

//byUser
const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.findAll({
            where: {
                created_by: req.user.userId
            },
            order: [
                ['created_at', 'DESC']
            ]
        })
        res.status(StatusCodes.OK).json({ jobs, count: jobs.length})
    } catch (error) {
        next(error)
    }
}

const getJob = async (req, res, next) => {
    try {
        const { id } = req.params
        const job = await Job.findByPk(id, {
            include: [{
                model: User,
                attributes: ['name']
            }] 
    })
    if(!job) {
        throw new ExpressError(`No se ha encontrado publicaciones con el id ${id}`, StatusCodes.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json({job})
    } catch (error) {
        next(error)
    }
}

const createJob = async (req, res, next) => {
    try {
        const { company, position, created_by } = req.body
        const job = await Job.create({company, position, created_by: req.user.userId})
        res.status(StatusCodes.OK).json({ job })
    } catch (error) {
        next(error)
    }

}

const updateJob = async (req, res, next) => {
    try {
        const { company, position } = req.body
        const { id } = req.params
        if(company === '' || position === '') {
            throw new ExpressError('Los campos company y position no pueden estar vacíos', StatusCodes.BAD_REQUEST)
        }
        const job = await Job.update({ company, position }, {
            where: {id}
        })
        if(!job) {
            throw new ExpressError(`No se ha encontrado publicaciones con el id ${id}`, StatusCodes.NOT_FOUND)
        }
        res.status(StatusCodes.OK).json({ job })
    } catch (error) {
        next(error)
    }
    
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params
        const job = await Job.destroy({
         where: { id }
        })
    if(!job) {
        throw new NotFoundError(`No se ha encontrado publicaciones con el id ${id}`, StatusCodes.NOT_FOUND)
    }
    res.status(StatusCodes.OK).send({ job })
    } catch (error) {
        next(error)    
    }  
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}