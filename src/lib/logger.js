'use strict'

const bunyan = require('bunyan')

const config = require('./config')
const logger_console = require('./logger_console')

// The call to process.env shall only be done once since it's costly
const pkg_name = process.env.npm_package_name

let logger

// When in test NODE_ENV or when no file_path is specified, the logger outputs
// to the console.
if (process.env.NODE_ENV == 'test' || !config.get('log.file_path')) {
    logger_console.setLevel(config.get('log.level'))
    logger = logger_console
} else {
    logger = bunyan.createLogger({
        name: pkg_name,
        streams: [{
            path: config.get('log.file_path')
        }],
        level: config.get('log.level')
    })
}

module.exports = logger
