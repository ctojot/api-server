// 'use strict';

// const express = require('express');
// const cors = require('cors');
// const app = express();

// const pokemonRouter = require('./routes/pokemon.js');
// const trainersRouter = require('./routes/trainers.js');

// app.use(cors());
// app.use(express.json());
// app.use('/api', pokemonRouter);
// app.use('/api', trainersRouter);


// // Error Handlers down here




// module.exports = {
//   app,
//   start: (port => {
//     app.listen(port, () => {
//       console.log('REST Server is running!');
//     });
//   }),
// };

'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const trainerRouter = require('./routes/trainers.js');
const { handleBadPath, handleBadMethod } = require('../lib/error-handlers/404.js');
const serverError = require('../lib/error-handlers/500.js');

app.use(cors());

app.use(express.json());
app.use(handleBadPath);
app.use(handleBadMethod);
app.use(serverError);

app.use('/api', trainerRouter);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('App is running!!');
    });
  },
};