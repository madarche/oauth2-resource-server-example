'use strict'

const parseBearerToken = require('parse-bearer-token').default

const config = require('../lib/config')
const logger = require('../lib/logger')
const {UnauthorizedError, ForbiddenError} = require('../lib/errors')
const oidc = require('../lib/oidc')

const allowed_client_ids = config.get('oidc.allowed_client_ids')

async function getAll(ctx, next) {
    const access_token = parseBearerToken(ctx.request)
    if (!access_token) {
        throw new UnauthorizedError('Missing token')
    }

    const oidc_client = await oidc.getOidcClient()
    const access_token_verify = await oidc_client.introspect(access_token)
    logger.trace('getAll headers:', ctx.request.headers)
    logger.trace('access_token_verify:', access_token_verify)
    if (!access_token_verify.active) {
        throw new UnauthorizedError('Not an active token')
    }

    // Custom conditions based on active (that is trustworthy) token properties
    // 1. Only allow certain client_ids
    // 2. Only allow certain audience
    // 3. Only allow certain issuer
    // etc.
    if (!allowed_client_ids.includes(access_token_verify.client_id)) {
        throw new ForbiddenError('Unallowed client_id')
    }

    // Example of an active token
    // access_token_verify: {
    //     active: true,
    //     sub: '1100032845',
    //     client_id: '67a7abf3-4d13-4def-9274-7764e9ccdd13',
    //     exp: 1596636375,
    //     iat: 1596632775,
    //     iss: 'https://connect.local.test',
    //     jti: 'MzcxZmY3ZDEtM2NiMi00MzZiLTkzZDQtMGMzODkzNWE3MWNi',
    //     scope: 'openid email profile'
    // }

    // Some async operations could be done here like retrieving items from DBs
    await Promise.resolve()

    // To have a different cache value for different tokens
    ctx.set('Vary', 'Authorization')
    ctx.set('Cache-Control', 'private, max-age=3600') // 1 hour
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

    // To have a different cache value for different tokens
    ctx.set('Vary', 'Authorization')
    ctx.set('Cache-Control', 'private, max-age=3600') // 1 hour
    ctx.body = {id: resource_id}
}

module.exports = {
    getAll,
    get,
}
