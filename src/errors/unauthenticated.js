const CustomAPIError = require('./customApi')
const { StatusCodes } = require('http-status-codes')

class Unauthenticated extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthenticated