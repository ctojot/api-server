'use strict';

const serverError = (err, req, res, next) => {
  console.log('AN ERROR OCCURED", err');
  res.status(500).json({ message: 'Server is broken' });
};

module.exports = serverError;
