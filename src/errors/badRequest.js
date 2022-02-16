const CustomAPIError = require('./customApi')
const { StatusCodes } = require('http-status-codes')

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.BAD_REQUEST 
    }
}

module.exports = BadRequest