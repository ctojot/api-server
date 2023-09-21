'use strict';

function serverError(err, req, res, next) {
  console.error;
  res.status(500).send('Server Error');
}

