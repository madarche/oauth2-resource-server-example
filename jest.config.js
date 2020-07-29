'use strict'

module.exports = {
    collectCoverageFrom: [
        'src/**',
    ],
    coverageDirectory: '/tmp/coverage-oauth2-resource-server-demo',
    globalSetup: './test/lib/setup.js',
    //globalTeardown: './test/lib/teardown.js',
}
