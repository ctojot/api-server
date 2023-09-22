// 'use strict';

// const express = require('express');
// const { TrainersModel } = require('../models');

// const router = express.Router(); // Can be attached to an app with different routes

// router.get('/trainers', async (req, res) => {

//   let records = await TrainersModel.findAll();
//   res.status(200).send({ results: records });

// });
// router.get('/trainers/:id', async (req, res) => {

//   let id = req.params.id;
//   let recordFindOne = await TrainersModel.findOne({
//     where: { id: id },
//   });
//   res.status(200).send(recordFindOne);

// });
// router.post('/trainers', async (req, res) => {

//   let records = await TrainersModel.create(req.body);
//   res.status(200).json(records);

// });
// router.patch('/trainers/:id', async (req, res) => { // Route parameter -- required value attached to URI

//   let id = req.params.id;
//   let recordToUpdate = await TrainersModel.findByPk(id);
//   recordToUpdate.update(req.body);
//   console.log('UPDATED RECORDS', recordToUpdate);
//   res.status(200).json(recordToUpdate);

// });
// router.delete('/pokemon/:id', async (req, res) => {

//   let id = req.params.id;
//   await TrainersModel.destroy({
//     where: { id },
//   });
//   res.status(204).send('Removed');

// });

// module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const { TrainerTable } = require('../models');

router.get('/trainers', handleGet);
router.post('/trainers', handlePost);
router.put('/trainers/:id', handlePut);
router.delete('/trainers/:id', handleDelete);


async function handleGet(req, res) {
  let records = await TrainerTable.read();
  res.status(200).json({ results: records });
}

async function handlePost(req, res) {
  let record = await TrainerTable.create(req.body);
  res.status(200).json(record);
}

async function handlePut(req, res) {
  let record = await TrainerTable.update(req.params.id, req.body);
  res.status(200).json(record);
}

async function handleDelete(req, res) {
  let result = await TrainerTable.delete(req.params.id);
  console.log('RESULTS FROM COLLECTION DELETE:', req.params.id, result);
  res.status(200).json({ result });
}

module.exports = router;