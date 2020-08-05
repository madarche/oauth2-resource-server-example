'use strict'

module.exports = {
    common: {
        base_url: {
            doc: 'Application base URL',
            format: 'url',
            default: 'https://api.local.test/'
        }
    },
    log: {
        level: {
            doc: 'Log level',
            format: ['error', 'warn', 'info', 'debug', 'trace'],
            default: 'info'
        },
        file_path: {
            doc: 'Log file path',
            format: '*',
            default: false
        }
    },
    server: {
        ip: {
            doc: 'IP address to bind',
            format: 'ipaddress',
            default: '127.0.0.1'
        },
        port: {
            doc: 'Port to bind',
            format: 'port',
            default: 9003
        }
    },
    oidc: {
        issuer_url: {
            doc: 'URL',
            format: 'url',
            default: 'https://connect.local.test/'
        },
        client_id: {
            doc: 'Client ID of this OIDC RP',
            format: String,
            default: null
        },
        client_secret: {
            doc: 'Client secret of this OIDC RP',
            format: String,
            default: null
        },
        allowed_client_ids: {
            doc: 'List of OIDC client IDs',
            format: Array,
            default: []
        },
    }
}
