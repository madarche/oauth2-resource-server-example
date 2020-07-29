'use strict'

const {Issuer} = require('openid-client')

// const logger = require('./logger');
const config = require('./config')

let oidc_client

async function getOidcClient() {
    if (oidc_client) {
        return oidc_client
    }

    const issuer = await Issuer.discover(config.get('oidc.issuer_url'))
    // logger.trace('Discovered issuer %s %O', issuer.issuer, issuer.metadata);
    oidc_client = new issuer.Client({
        response_types: ['code'],
        client_id: config.get('oidc.client_id'),
        token_endpoint_auth_method: 'client_secret_basic',
        client_secret: config.get('oidc.client_secret'),
    })

    return oidc_client
}

module.exports = {
    getOidcClient,
}
