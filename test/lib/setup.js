'use strict'

const fs = require('fs')
const readFile = fs.promises.readFile
const writeFile = fs.promises.writeFile

const PKG_NAME = 'oauth2-resource-server-example'
const PKG_VERSION = '1.0.0'

const CONFIG_EXAMPLE_FILE_PATH = './config.toml.example'
const CONFIG_TEST_FILE_PATH = './config.test.toml'

module.exports = async() => {
    // Setting the same properties npm does when doing "npm start"
    process.env.npm_package_name = PKG_NAME
    process.env.npm_package_version = PKG_VERSION

    const data = await readFile(CONFIG_EXAMPLE_FILE_PATH, 'utf8')

    try {
        await writeFile(CONFIG_TEST_FILE_PATH, data, {flag: 'wx'})
    } catch (err) {
        if (err.code === 'EEXIST') {
            // The file already exists → it's OK: don't overwrite it
            return
        }
    }
}
