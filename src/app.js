const express = require('express');
const app = express();
const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

app.use(express.json());

// ------ Configure swagger docs ------
const options = {
  swaggerDefinition: {
    info: {
      title: 'Music Library',
      version: '1.0.0',
      description: 'My API for adding Artists and Albums into a SQL database!',
    },
  },
  apis: [path.join(__dirname, '/routes/*.js')],
};

const swaggerSpecs = swaggerJsdoc(options);

app.get('/', (req, res) => {
  res.status(200).send('Hello World!ʕ•́ᴥ•̀ʔっ');
});

app.use('/artists', artistRouter);
app.use('/artists', albumRouter);
app.use('/albums', albumRouter);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = app;
