
'use strict';

const server = require('../src/server')
const supertest = require('supertest');
const request = supertest(server.app);
const { DB } = require('../src/auth/models/index')
let id;
let Users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};
beforeAll(async () => {
    await DB.sync();
})
afterAll(async () => {
    await DB.drop();
})
Object.keys(Users).forEach(element => {
    describe('testing sport model for v2 route', () => {

        it('create new clothes', async () => {
            let Auth = await request.post('/signup').send(Users[element]);
            let userToken = Auth.body.token;
            const response = await request.post('/api/v2/clothes').send({
                clothesType: "test",
                clothesSize: "test"
            }).set("Authorization", `Bearer ${userToken}`);
            id = response.body.id
            if (element === 'writer' || element === 'editor' || element === 'admin') {
                expect(response.status).toBe(201);
            } else {
                expect(response.status).toBe(500);
            }
        });
        it('test get all clothes', async () => {
            let Auth = await request.post('/signin').auth(Users[element].username, Users[element].password);
            let userToken = Auth.body.token;
            const response = await request.get('/api/v2/clothes').set('Authorization', `Bearer ${userToken}`)
            expect(response.status).toEqual(200)
        })
        it('testing get one clothes by id', async () => {
            let Auth = await request.post('/signin').auth(Users[element].username, Users[element].password);
            let userToken = Auth.body.token;
            const response = await request.get(`/api/v2/clothes/${id}`).set('Authorization', `Bearer ${userToken}`)
            expect(response.status).toEqual(200)
        })


        it('update new clothes', async () => {
            let Auth = await request.post('/signin').auth(Users[element].username, Users[element].password);
            let userToken = Auth.body.token;
            const response = await request.put(`/api/v2/clothes/${id}`).send({
                clothesType: "test",
                clothesSize: "test"
            }).set("Authorization", `Bearer ${userToken}`);
            if (element == 'editor' || element == 'admin') {
                expect(response.status).toBe(201);
            } else {
                expect(response.status).toBe(500);
            }
        });

        it('deleting clothes by id', async () => {
            let Auth = await request.post('/signin').auth(Users[element].username, Users[element].password);
            let userToken = Auth.body.token;
            const response = await request.delete(`/api/v2/clothes/${id}`).set("Authorization", `Bearer ${userToken}`);

            if (Users[element].role === 'admin') {
                expect(response.status).toBe(204);
            } else {
                expect(response.status).toBe(500);
            }
        })

    })
});