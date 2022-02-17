const CustomAPIError = require("./customApi");
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError