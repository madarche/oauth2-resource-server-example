'use strict'

/**
 * Generic error when a user submits wrong values or when there are problems
 * about the processing of (valid) user submitted values.
 *
 * To be used for 400 Unauthorized HTTP status code
 */
class BadRequestError extends Error {
    constructor(message, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        this.message = message
    }
}

/** To be used for 401 Unauthorized HTTP status code */
class UnauthorizedError extends Error {
    constructor(message, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        this.message = message
    }
}

/** To be used for 403 ForbiddenError HTTP status code */
class ForbiddenError extends Error {
    constructor() {
        super()
    }
}

/** To be used for 404 Not Found HTTP status code */
class NotFoundError extends Error {
    constructor(message, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params)

        this.message = message
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
}
