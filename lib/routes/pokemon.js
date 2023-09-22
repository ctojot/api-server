// 'use strict';

// const express = require('express');
// const { PokemonModel } = require('../models');

// const router = express.Router(); // Can be attached to an app with different routes

// router.get('/pokemon', async (req, res) => {

//   let records = await PokemonModel.findAll();
//   res.status(200).send({ results: records });

// });
// router.get('/pokemon/:id', async (req, res) => {

//   let id = req.params.id;
//   let recordFindOne = await PokemonModel.findOne({
//     where: { id: id },
//   });
//   res.status(200).send(recordFindOne);

// });
// router.post('/pokemon', async (req, res) => {

//   let records = await PokemonModel.create(req.body);
//   res.status(200).json(records);

// });
// router.patch('/pokemon/:id', async (req, res) => { // Route parameter -- required value attached to URI

//   let id = req.params.id;
//   let recordToUpdate = await PokemonModel.findByPk(id);
//   recordToUpdate.update(req.body);
//   console.log('UPDATED RECORDS', recordToUpdate);
//   res.status(200).json(recordToUpdate);

// });
// router.delete('/pokemon/:id', async (req, res) => {

//   let id = req.params.id;
//   await PokemonModel.destroy({
//     where: { id },
//   });
//   res.status(204).send('Removed');

// });

// module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const { PokemonTable } = require('../models');

router.get('/pokemon', handleGet);
router.post('/pokemon', handlePost);
router.put('/pokemon/:id', handlePut);
router.delete('/pokemon/:id', handleDelete);


async function handleGet(req, res) {
  let records = await PokemonTable.read();
  res.status(200).json({ results: records });
}

async function handlePost(req, res) {
  let record = await PokemonTable.create(req.body);
  res.status(200).json(record);
}

async function handlePut(req, res) {
  let record = await PokemonTable.update(req.params.id, req.body);
  res.status(200).json(record);
}

async function handleDelete(req, res) {
  let result = await PokemonTable.delete(req.params.id);
  console.log('RESULTS FROM COLLECTION DELETE:', req.params.id, result);
  res.status(200).json({ result });
}

module.exports = router;