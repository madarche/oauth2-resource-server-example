'use strict'

const request = require('supertest')

const app = require('../../src/app')

let server

describe('Application resources controller', () => {

    beforeAll((done) => {
        server = app.listen(done)
    })

    afterAll((done) => {
        server.close(() => {
            // Connexions to the DBs could be closed here
        })
    })

    test('provides Read all', async() => {
        const res = await request(server).get('/resources')
        expect(res.statusCode).toBe(401)
    })

    test('provides Read one', async() => {
        const res = await request(server).get('/resources/1')
        expect(res.statusCode).toBe(401)
    })

    // test('provides Read all', async() => {
    //     const res = await request(server).get('/resources')
    //     expect(res.statusCode).toBe(200)
    //     expect(res.header['content-type']).toMatch(/application\/json/)
    //
    //     expect(res.body).toBeInstanceOf(Array)
    // })

    // test('provides Read one', async() => {
    //     const res = await request(server).get('/resources/1')
    //     expect(res.statusCode).toBe(200)
    //     expect(res.header['content-type']).toMatch(/application\/json/)
    //
    //     expect(res.body).toBeInstanceOf(Object)
    // })

})
