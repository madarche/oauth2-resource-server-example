/**
 * The logger to use to output to the console, typically to be used for the
 * start/stop events and the tests.
 */

'use strict'

const tracer = require('tracer')

// We don't want to initially set the log level through the config here
// (config.get('log.level')), because the logger_console is used by the config
// module itself (i.e. to avoid a dependency loop). But the log level can be set
// later on if needed.
const logger = tracer.colorConsole({level: 'trace'})

// We have to add our own "setLevel" method on our created logger because this
// feature doesn't exist in the tracer module: the "setLevel" method of the
// tracer module is a global setting and affects all output that are created via
// tracer. And once the level is initialized in tracer it's not possible to
// change it to a lower level than the initial level.
logger.setLevel = function(log_level) {
    tracer.setLevel(log_level)
}

module.exports = logger
