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