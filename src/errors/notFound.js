const CustomAPIError = require("./customApi");
const { StatusCodes } = require('http-status-codes')

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFound