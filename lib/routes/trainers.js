'use strict';

const express = require('express');
const { TrainersModel } = require('../models');

const router = express.Router(); // Can be attached to an app with different routes

router.get('/trainers', async (req, res) => {

  let records = await TrainersModel.findAll();
  res.status(200).send({ results: records });

});
router.get('/trainers/:id', async (req, res) => {

  let id = req.params.id;
  let recordFindOne = await TrainersModel.findOne({
    where: { id: id },
  });
  res.status(200).send(recordFindOne);

});
router.post('/trainers', async (req, res) => {

  let records = await TrainersModel.create(req.body);
  res.status(200).json(records);

});
router.patch('/trainers/:id', async (req, res) => { // Route parameter -- required value attached to URI

  let id = req.params.id;
  let recordToUpdate = await TrainersModel.findByPk(id);
  recordToUpdate.update(req.body);
  console.log('UPDATED RECORDS', recordToUpdate);
  res.status(200).json(recordToUpdate);

});
router.delete('/pokemon/:id', async (req, res) => {

  let id = req.params.id;
  await TrainersModel.destroy({
    where: { id },
  });
  res.status(204).send('Removed');

});

module.exports = router;