'use strict'

const Router = require('@koa/router')

const app = require('./app')

const router = new Router()

const info = require('./controller/info')
router.get('/', info.getAppInfo)
router.get('/info', info.getAppInfo)

const resources = require('./controller/resources')
router
    .get('/resources', resources.getAll)
    .get('/resources/:resource_id', resources.get)

app
    .use(router.routes())
    .use(router.allowedMethods())
