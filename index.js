const express = require('express');
const dataHandler = require("./dataHandler");
const catApiRouter = require('./api/cat');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // inc req body to req.body as json

app.use('/api/kittens', catApiRouter);

dataHandler.init((err, created) => {
  if (created) {
    console.log("File does not exists, i create for you");
  } else {
    console.log("File already exists");
  }

  app.listen(8080, () => {
    console.log('App listening on 8080');
    console.log('Cat Api: http://localhost:8080/api/kittens');
  })
});
