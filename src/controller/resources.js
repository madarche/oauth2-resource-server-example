'use strict'

const parseBearerToken = require('parse-bearer-token').default

const logger = require('../lib/logger')
const errors = require('../lib/errors')
const UnauthorizedError = errors.UnauthorizedError
const oidc = require('../lib/oidc')

async function getAll(ctx, next) {
    const access_token = parseBearerToken(ctx.request)
    if (!access_token) {
        throw new UnauthorizedError('missing token')
    }

    const oidc_client = await oidc.getOidcClient()
    const access_token_verify = await oidc_client.introspect(access_token)
    logger.trace('access_token_verify:', access_token_verify)

    // Some async operations could be done here like retrieving items from DBs
    await Promise.resolve()

    ctx.body = [{id: '1'}, {id: '2'}, {id: '3'}]
}

async function get(ctx, next) {
    const access_token = parseBearerToken(ctx.request)
    if (!access_token) {
        throw new UnauthorizedError('missing token')
    }

    const oidc_client = await oidc.getOidcClient()
    const access_token_verify = await oidc_client.introspect(access_token)
    logger.trace('access_token_verify:', access_token_verify)

    // Some async operations could be done here like retrieving items from DBs
    await Promise.resolve()

    const resource_id = ctx.params.resource_id

    ctx.body = {id: resource_id}
}

module.exports = {
    getAll,
    get,
}
