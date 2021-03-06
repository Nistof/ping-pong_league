const winston = require('winston');

const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/api/users');
const gameRoutes = require('./routes/api/games');

const app = express();
const port = process.env.PING_PONG_SERVER_PORT || 3000;

// Server configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(`${process.cwd()}/dist`));
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Listen
const server = app.listen(port, () => {
  winston.log(
    'info',
    'Server listening',
    {
      port: server.address().port,
    },
  );
});
