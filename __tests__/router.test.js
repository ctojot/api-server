'use strict';

const supertest = require('supertest');
const server = require('../lib/server');
const { sequelize } = require('../lib/models/');
const request = supertest(server.app);

// Built in jest function to setup test suite
beforeAll(async () => {
  await sequelize.sync(); // sets up our tables before tests run
});
afterAll(async () => {
  await sequelize.drop(); // removes the tables we set up for our test environment
});

describe('Testing the REST Router', () => {

  test('Should CREATE food', async () => {

    let response = await request.post('/api/food').send({
      name: 'pizza',
      type: 'italian',
    });

    expect(response.status).toEqual(200);
    console.log(response.body);
    expect(response.body.name).toEqual('pizza');

  });

  test('Should READ food', async () => {

    let response = await request.get('/api/food');

    expect(response.status).toEqual(200);
    console.log(response.body);
    expect(response.body.results).toBeTruthy();

  });

  test('Should UPDATE food', async () => {
    let response = await request.patch('/api/food/1').send({
      name: 'Ramen',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Ramen');
  });

  test('Should DELETE food', async () => {

    let response = await request.delete('/api/food/1');

    expect(response.status).toEqual(204);
  });

}); 