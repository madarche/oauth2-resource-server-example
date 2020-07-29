'use strict'

const request = require('supertest')

const app = require('../../src/app')

let server

describe('Application root', () => {

    beforeAll((done) => {
        server = app.listen(done)
    })

    afterAll((done) => {
        server.close(done)
    })

    test('is secure', async() => {
        const res = await request(server).get('/')
        expect(res.statusCode).toBe(200)

        expect(res.header).not.toHaveProperty('x-powered-by')

        expect(res.header).toHaveProperty('x-content-type-options', 'nosniff')
        expect(res.header).toHaveProperty('x-frame-options', 'DENY')
    })

    test('has default response', async() => {
        const res = await request(server).get('/')
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toMatch(/text\/plain/)
    })

})
