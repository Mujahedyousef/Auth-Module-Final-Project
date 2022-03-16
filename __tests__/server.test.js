const server = require('../src/server')
const supertest = require('supertest');
const request=supertest(server.app)
describe('testing API', () => {

    it("test home route", async () => {
        let response = await request.get('/')
        expect(response.text).toEqual("Welcome in Home page.")
    });

    it("test 404 on a bad route", async () => {
        let response = await request.get('/vvv')
        expect(response.status).toEqual(404)
    });

    it("404 on a bad method", async () => {
        let response = await request.patch('/clothes')
        expect(response.status).toEqual(404)
    });
})