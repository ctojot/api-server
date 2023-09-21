'use strict';

const express = require('express');
const { FoodModel } = require('../models');

const router = express.Router(); // Can be attached to an app with different routes

router.get('/food', async (req, res) => {

  let records = await FoodModel.findAll();
  res.status(200).send({ results: records });

});
router.get('/food/:id', async (req, res) => {

  let id = req.params.id;
  let recordFindOne = await FoodModel.findOne({
    where: { id: id },
  });
  res.status(200).send(recordFindOne);

});
router.post('/food', async (req, res) => {

  let records = await FoodModel.create(req.body);
  res.status(200).json(records);

});
router.patch('/food/:id', async (req, res) => { // Route parameter -- required value attached to URI

  let id = req.params.id;
  let recordToUpdate = await FoodModel.findByPk(id);
  recordToUpdate.update(req.body);
  console.log('UPDATED RECORDS', recordToUpdate);
  res.status(200).json(recordToUpdate);

});
router.delete('/food/:id', async (req, res) => {

  let id = req.params.id;
  await FoodModel.destroy({
    where: { id },
  });
  res.status(204).send('Removed');

});

module.exports = router;