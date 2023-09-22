'use strict';

const supertest = require('supertest');
const server = require('../lib/server');
const { sequelize, PokemonModel, TrainersModel } = require('../lib/models');
const request = supertest(server.app);

// Built in jest function to setup test suite
beforeAll(async () => {
  await sequelize.sync(); // sets up our tables before tests run
});
afterAll(async () => {
  await sequelize.drop(); // removes the tables we set up for our test environment
});

describe('Testing the REST Router', () => {

  // TRAINERS TEST
  // TEST CREATE
  test('Should CREATE trainers (/trainers)', async () => {
    let response = await request.post('/api/trainers').send({
      name: 'Ash',
      pokemonNum: '77',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Ash');
  });

  // TEST READ
  test('Should READ trainers (/trainers)', async () => {
    let response = await request.get('/api/trainers');

    expect(response.status).toEqual(200);
    expect(response.body.results).toBeTruthy();
  });

  // Test UPDATE

  test('Should UPDATE trainers (/trainers/1)', async () => {
    let response = await request.patch('/api/trainers/1').send({
      pokemonNum: 6,
    });

    expect(response.status).toEqual(200);
    expect(response.body.pokemonNum).toEqual(6);
  });

  // TEST DELETE
  test('Should DELETE trainers (/trainers/1)', async () => {
    let response = await request.delete('/api/trainers/1');
    console.log(response.status);
    console.log(response.body);
    expect(response.status).toEqual(204);
  });

  // POKEMON TESTS
  // CREATE POKEMON
  test('Should CREATE pokemon', async () => {

    let response = await request.post('/api/pokemon').send({
      name: 'Pikachu',
      type: 'electric',
    });

    expect(response.status).toEqual(200);
    console.log(response.body);
    expect(response.body.name).toEqual('Pikachu');

  });

  // READ POKEMON
  test('Should READ pokemon', async () => {

    let response = await request.get('/api/pokemon');

    expect(response.status).toEqual(200);
    console.log(response.body);
    expect(response.body.name).toBeTruthy();

  });

  // TEST UPDATE
  test('Should UPDATE pokemon', async () => {
    let response = await request.patch('/api/pokemon/1').send({
      name: 'Gengar',
    });

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Gengar');
  });
  // TEST DELETE
  test('Should DELETE pokemon', async () => {

    let response = await request.delete('/api/pokemon/1');

    expect(response.status).toEqual(204);
  });

});

// ASSOCIATION TESTS
describe('Testing model association', () => {

  let trainer;
  let pokemon;

  test('Create a trainer with a pokemon', async () => {

    trainer = await TrainersModel.create({
      name: 'Brock',
      pokemonNum: '45',
    });
    pokemon = await PokemonModel.create({
      name: 'Geodude',
      trainerId: trainer.id,
    });

    expect(trainer.name).toEqual('Brock');
    expect(pokemon.name).toEqual('Geodude');
    expect(pokemon.trainerId).toEqual(trainer.id);
  });

  test('Fetch a trainer and include all pokemon', async () => {
    trainer = await TrainersModel.findOne({ where: { id: trainer.id }, include: PokemonModel });
    console.log(trainer);
    expect(trainer.name).toEqual('Brock');
    expect(trainer.pokemonNum).toBeTruthy();
    expect(trainer.pokemonNum[0].name).toEqual('Geodude');
  });
  
});