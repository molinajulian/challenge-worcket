const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const routes = require('./app/routes');
const { bodySizeLimit, parameterLimit } = require('./config').api;
const { handle } = require('./app/middlewares/errors');
const documentation = require('./app/documentation');

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json({ parameterLimit, limit: bodySizeLimit }));
app.use(
  bodyParser.urlencoded({
    parameterLimit,
    limit: bodySizeLimit,
    extended: true
  })
);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation));
//configure cors
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
routes.init(app);
app.use(handle);
module.exports = app;
