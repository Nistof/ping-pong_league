const winston = require('winston');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/api/users');

const app = express();
const port = process.env.PING_PONG_SERVER_PORT || 3000;

// Server configuration
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

// Listen
const server = app.listen(port, () => {
  winston.log(
    'info',
    'Server listening',
    {
      address: server.address().address,
      port: server.address().port,
    },
  );
});
