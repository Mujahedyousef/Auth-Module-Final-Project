
const server = require('../src/server')
const supertest = require('supertest');
const mockRequest = supertest(server.app);
const { DB } = require('../src/auth/models/index')
let id;



process.env.SECRET = "toes";

beforeAll(async () => {
    await DB.sync();
})
afterAll(async () => {
    await DB.drop();
})

let users = {
    admin: { id: 0, username: 'admin', password: 'password' },
    editor: { id: 1, username: 'editor', password: 'password' },
    user: { id: 2, username: 'user', password: 'password' },
};
describe('Auth Router', () => {

    Object.keys(users).forEach(userType => {

        describe(`${userType} users`, () => {

            it('can create one', async () => {

                const response = await mockRequest.post('/signup').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });

            it('can signin with basic', async () => {

                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);

                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.username).toEqual(users[userType].username)
            });

            it('can signin with bearer', async () => {

                // First, use basic to login to get a token
                const response = await mockRequest.post('/signin')
                    .auth(users[userType].username, users[userType].password);

                const token = response.body.token;

                // First, use basic to login to get a token
                const bearerResponse = await mockRequest
                    .get('/users')
                    .set('Authorization', `Bearer ${token}`)

                // Not checking the value of the response, only that we "got in"
                expect(bearerResponse.status).toBe(200);

            });

        });

        describe('bad logins', () => {
            it('basic fails with known user and wrong password ', async () => {

                const response = await mockRequest.post('/signin')
                    .auth('admin', 'xyz')
                const userObject = response.body;

                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });

            it('basic fails with unknown user', async () => {

                const response = await mockRequest.post('/signin')
                    .auth('nobody', 'xyz')
                const userObject = response.body;

                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined()
            });

            it('bearer fails with an invalid token', async () => {

                // First, use basic to login to get a token
                const bearerResponse = await mockRequest
                    .get('/users')
                    .set('Authorization', `Bearer foobar`)

                // Not checking the value of the response, only that we "got in"
                expect(bearerResponse.status).toBe(403);
            })
        })

    });

});