'use strict'

const util = require('util')
const path = require('path')
const fs = require('fs')
const parseArgs = require('yargs-parser')
const toml = require('toml')
const convict = require('convict')
const convict_format_with_validator = require('convict-format-with-validator')

const logger_console = require('./logger_console')
const config_schema = require('../config-schema.js')

const CONFIG_DEFAULT_FILE_NAME = 'config.toml'
const CONFIG_ENV_FILE_NAME = 'config.%s.toml'

// We can't use the following because when running tests the main module is mocha.
// The filename of the main module (this is src/start.js)
//const main_module_file_path = require.main.filename;
//const src_dir_path = path.dirname(main_module_file_path);

// This is the directory path containing the package.json file
const pkg_dir_path = path.join(__dirname, '../..')
// The word "package" is reserved, thus we use "pkg"
const pkg = require(path.join(pkg_dir_path, 'package.json'))

convict.addFormats(convict_format_with_validator)
const config = convict(config_schema)
const args = parseArgs(process.argv.slice(2))

/**
 * Gets this NPM package dir path.
 */
function getPkgDirPath() {
    return pkg_dir_path
}

function getPkg() {
    return pkg
}

/**
 * Returns a property value from the config file
 */
function get(prop_name) {
    return config.get(prop_name)
}

/**
 * Sets a property in the config file
 */
function set(prop_name, prop_val) {
    config.set(prop_name, prop_val)
}

/**
 * Resets a property to its default value as defined in the schema
 */
function reset(prop_name) {
    config.reset(prop_name)
}

/**
 * Returns all the config file properties as an object
 */
function getConfProperties() {
    return config.getProperties()
}

/**
 * Loads the resources (schema file, config file) the module needs
 */
function init() {
    let config_file_path
    if (args.conf) {
        config_file_path = path.resolve(args.conf)
        logger_console.info('Loading config file', config_file_path)
    } else if (process.env.NODE_ENV) {
        const file_name = util.format(CONFIG_ENV_FILE_NAME, process.env.NODE_ENV)
        config_file_path = path.join(process.cwd(), file_name)
        logger_console.info('Loading env config file', config_file_path)
    } else {
        // If there is a config.json file while doing an "npm start", this is
        // useful when developing the application.
        const file_path = path.join(process.cwd(), CONFIG_DEFAULT_FILE_NAME)
        // TODO: Remove this sync use
        // eslint-disable-next-line no-sync
        if (fs.existsSync(file_path)) {
            config_file_path = file_path
            logger_console.info('Loading default config file', config_file_path)
        }
    }

    if (config_file_path) {
        const config_data = readTomlFile(config_file_path)
        config.load(config_data)
    }
    config.validate()
}

function readTomlFile(file_path) {
    // TODO: Remove this sync use
    // eslint-disable-next-line no-sync
    const src = fs.readFileSync(file_path, {encoding: 'utf8'})
    try {
        return toml.parse(src)
    } catch (err) {
        if (err.line && err.column) {
            throw new Error(`Error compiling ${file_path}
                    at line ${err.line}, column ${err.column}: ${err.message}`)
        } else {
            throw err
        }
    }
}

init()

module.exports = {
    getPkgDirPath,
    getPkg,
    get,
    set,
    reset,
    getConfProperties,
}
