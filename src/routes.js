'use strict'

const path = require('path')
const Router = require('@koa/router')
const input_validation = require('openapi-validator-middleware')

const config = require('./lib/config')
const app = require('./app')

const OPENAPI_SCHEMA_FILE_RPATH = 'src/openapi-schema.yml'
const openapi_schema_file_path = path.join(config.getPkgDirPath(),
    OPENAPI_SCHEMA_FILE_RPATH)
input_validation.init(openapi_schema_file_path, {
    beautifyErrors: true,
    framework: 'koa',
})

const router = new Router()

const info = require('./controller/info')
router.get('/', info.getAppInfo)
router.get('/info', info.getAppInfo)

const resources = require('./controller/resources')
router
    .get('/resources', input_validation.validate, resources.getAll)
    .get('/resources/:resource_id', input_validation.validate, resources.get)

app
    .use(router.routes())
    .use(router.allowedMethods())
