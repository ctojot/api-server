'use strict';

const express = require('express');
const { PokemonModel } = require('../models');

const router = express.Router(); // Can be attached to an app with different routes

router.get('/pokemon', async (req, res) => {

  let records = await PokemonModel.findAll();
  res.status(200).send({ results: records });

});
router.get('/pokemon/:id', async (req, res) => {

  let id = req.params.id;
  let recordFindOne = await PokemonModel.findOne({
    where: { id: id },
  });
  res.status(200).send(recordFindOne);

});
router.post('/pokemon', async (req, res) => {

  let records = await PokemonModel.create(req.body);
  res.status(200).json(records);

});
router.patch('/pokemon/:id', async (req, res) => { // Route parameter -- required value attached to URI

  let id = req.params.id;
  let recordToUpdate = await PokemonModel.findByPk(id);
  recordToUpdate.update(req.body);
  console.log('UPDATED RECORDS', recordToUpdate);
  res.status(200).json(recordToUpdate);

});
router.delete('/pokemon/:id', async (req, res) => {

  let id = req.params.id;
  await PokemonModel.destroy({
    where: { id },
  });
  res.status(204).send('Removed');

});

module.exports = router;