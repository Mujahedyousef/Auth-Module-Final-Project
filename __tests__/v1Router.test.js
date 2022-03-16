'use strict';

const server = require('../src/server')
const supertest = require('supertest');
const request = supertest(server.app);
const { DB } = require('../src/auth/models/index')
let id;
beforeAll(async () => {
    await DB.sync();
})
afterAll(async () => {
    await DB.drop();
})

describe('test clothes model for v1 route', () => {

    it('create new clothes', async () => {
        const response = await request.post('/api/v1/clothes').send({
            clothesType: "test",
            clothesSize: "test"
        });
        expect(response.status).toEqual(201);
        id = response.body.id
    });

    it('test get all clothes', async () => {
        const response = await request.get('/api/v1/clothes')
        expect(response.status).toEqual(200)
    })

    it('test clothes get by id ', async () => {
        const response = await request.get(`/api/v1/clothes/${id}`)
        expect(response.status).toEqual(200);
    })


    it('update clothes', async () => {
        const response = await request.put(`/api/v1/clothes/${id}`).send({
            clothesType: "test",
            clothesSize: "test"
        })
        expect(response.status).toEqual(201);
    });

    it('delete clothes by id', async () => {
        const response = await request.delete(`/api/v1/clothes/${id}`)
        expect(response.status).toEqual(204);
    })

})