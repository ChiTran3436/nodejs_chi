const StatusCode = require('./statusCode')
const ReasonCode = require('./ressonCode')

class ErrorCustom extends Error {
    constructor(message, status) {
        super(message),
            this.status = status
    }
}


class BadRequestError extends ErrorCustom {
    constructor(message = ReasonCode.BAD_REQUEST, status = StatusCode.BAD_REQUEST) {
        super(message, status)
    }
}

class AuthFailError extends ErrorCustom {
    constructor(message = ReasonCode.UNAUTHORIZED, status = StatusCode.UNAUTHORIZED) {
        super(message, status)
    }
}




module.exports = {
    ErrorCustom,
    BadRequestError,
    AuthFailError
}



