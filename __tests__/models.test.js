'use strict';

const { sequelize, TrainerModel, PokemonModel } = require('../lib/models');

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the Model Associations', () => {
  let trainer;
  let pokemon;

  test('Should be able to create a Person with and Order', async () => {
    trainer = await TrainerModel.create({
      name: 'Ash',
      pokeNum: 20,
    });
    pokemon = await PokemonModel.create({
      name: 'Pikachu',
      trainerId: trainer.id,
    });

    expect(trainer.name).toEqual('Ash');
    expect(pokemon.name).toEqual('Pikachu');
    expect(trainer.pokeNum).toEqual(20);
    expect(pokemon.trainerId).toEqual(trainer.id);
  });

  test('Should be able to fetch a person and include all orders', async () => {
    trainer = await TrainerModel.read(trainer.id, {
      include: PokemonModel.model,
    });

    expect(trainer.name).toEqual('Ash');
    console.log('Here at pokemon:', trainer.Pokemon[0]);
    expect(trainer.Pokemon[0].name).toEqual('Pikachu');
  });
});