'use strict'

const helmet = require('koa-helmet')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')

const logger = require('./lib/logger')
const errors = require('./lib/errors')
const BadRequestError = errors.BadRequestError
const UnauthorizedError = errors.UnauthorizedError

// It's needed to access app from outside, such as for supertest tests
// otherwise one gets "Object #<Object> has no method 'address'" in tests
const app = module.exports = new Koa()

app.use(helmet({frameguard: {action: 'deny'}}))

// bodyparser offers a jsonLimit protection of the json body of 1mb by default
app.use(bodyParser({enableTypes: ['json']}))

// Global error handler, must be at the beginning of the middleware chain
app.use(async(ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err instanceof BadRequestError) {
            ctx.status = 400
        } else if (err instanceof UnauthorizedError) {
            ctx.status = 401
        } else {
            // Log all other unexpected errors
            logger.error(err)

            // But don't output nor send the actual errors to the clients/users, just
            // send a HTTP status codes.
            ctx.status = err.status || 500
        }
    }
})

require('./routes')
