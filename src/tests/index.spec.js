const supertest = require('supertest');
const app = require('../server');
const faker = require('faker');
const request = supertest(app);
let email = faker.internet.email();
let password = faker.internet.password();
let user;


describe('Start Tests', () => {

  it('Check index route', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  })

  it('Sign up route', async () => {
    const response = await request.post('/sign_up').send(
      {
        nome: faker.name.findName(),
        email: email,
        senha: password,
        telefones: [
          {
            numero: faker.phone.phoneNumber(),
            ddd: 85
          }
        ]
      }
    );
    user = response.body;
    expect(response.status).toBe(201);
  })

  it('Sign up route', async () => {
    const response = await request.post('/sign_in').send(
      {
        email: email,
        senha: password,
      }
    );
    user = response.body;
    expect(response.status).toBe(200);
  })

  it('Search route', async () => {
    const response = await request.get(`/search/${user._id}`)
                                  .set('Authentication', user.token);
    expect(response.status).toBe(200);
  })

})