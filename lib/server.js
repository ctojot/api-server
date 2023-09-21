'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

const foodRouter = require('./routes/food.js');

app.use(cors());
app.use(express.json());
app.use('/api', foodRouter);


// Error Handlers down here




module.exports = {
  app,
  start: (port => {
    app.listen(port, () => {
      console.log('REST Server is running!');
    });
  }),
};