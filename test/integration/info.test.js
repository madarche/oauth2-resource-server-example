'use strict'

const request = require('supertest')

const app = require('../../src/app')

// The call to process.env shall only be done once since it's costly
const app_name = process.env.npm_package_name
let server

describe('Application info routes', () => {

    beforeAll((done) => {
        server = app.listen(done)
    })

    afterAll((done) => {
        server.close(done)
    })

    test('provides information as text', async() => {
        const res = await request(server).get('/info')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toMatch(/text\/plain/)

        expect(res.text).toMatch(/\w+-[a-z0-9.-]+\n/)
    })

    test('provides information as JSON', async() => {
        const res = await request(server).get('/info')
            .set('Accept', 'application/json')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toMatch(/application\/json/)

        expect(res.body).toHaveProperty('name', app_name)
        expect(res.body).toHaveProperty('version')
        expect(res.body.version).toMatch(/[a-z0-9.-]+$/)
        expect(res.body).toHaveProperty('full_name')
        expect(res.body.full_name).toMatch(/\w+-[a-z0-9.-]+$/)
    })

})
