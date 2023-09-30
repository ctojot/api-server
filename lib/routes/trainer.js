'use strict';

const express = require('express');
const router = express.Router();
const { TrainerTable } = require('../models');

router.get('/trainer', handleGet);
router.post('/trainer', handlePost);
router.put('/trainer/:id', handlePut);
router.delete('/trainer/:id', handleDelete);


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