'use strict';

const supertest = require('supertest');
const server = require('../lib/server');
const { sequelize, PokemonModel } = require('../lib/models');
const request = supertest(server.app);

let testTrainer;

beforeAll(async () => {
  await sequelize.sync();
  testTrainer = await PokemonModel.create({ name: 'test', type: 'test' });
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the REST Router', () => {
  test('Should READ pet', async () => {
    let response = await request.get('/api/pokemon');

    expect(response.status).toEqual(200);
    expect(response.body.results).toBeTruthy();
  });

  test('Should CREATE pokemon', async () => {
    let response = await request.post('/api/pokemon').send({
      name: 'Pikachu',
      personId: testTrainer.id,
    }); 
    console.log('THIS IS OUR RESPONSE BODY:', response.body);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Pikachu');
    expect(response.body.personId).toEqual(1);
  });

  test('Should UPDATE pokemon', async () => {
    let response = await request.put('/api/pokemon/1').send({
      name: 'Pikachu',
      personId: 2,
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Pikachu');
    expect(response.body.personId).toEqual(2);
  });

  test('Should DELETE pokemon', async () => {
    let response = await request.delete('/api/pokemon');

    expect(response.status).toEqual(200);
  });
});

describe('Testing the REST Router', () => {
  test('Will this return a 404 error - bad path', async () => {
    let response = await request.get('/api/notAnEndpoint');

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Error 404 - Incorrect Path');
  });

  test('Will this return a 404 error - bad method', async () => {
    let response = await request.patch('/api/trainer');

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Error 404 - Incorrect Method');
  });

  test('Should READ trainer', async () => {
    let response = await request.get('/api/trainer');

    expect(response.status).toEqual(200);
    expect(response.body.results).toBeTruthy();
  });

  test('Should CREATE trainer', async () => {
    let response = await request.post('/api/trainer').send({
      name: 'Brock',
      pokeNum: 100,
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Brock');
    expect(response.body.pokeNum).toEqual(100);
  });

  test('Should UPDATE person', async () => {
    let response = await request.put('/api/trainer/1').send({
      name: 'Brock',
      pokeNum: 50,
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Brock');
    expect(response.body.age).toEqual(50);
  });

  test('Should DELETE trainer', async () => {
    let response = await request.delete('/api/trainer/1');

    expect(response.status).toEqual(200);
  });
});
