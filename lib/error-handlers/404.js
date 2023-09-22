'use strict';

const handleBadPath = async (req, res, next) => {

};

const handleBadMethod = async (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({ error: 'Not Found', message: 'The requested resource was not found.' });
  } else {
    res.status(404).json({ error: 'Method Not Allowed', message: 'The requested method is not allowed for this resource.' });
  }
};

module.exports = { handleBadPath, handleBadMethod };