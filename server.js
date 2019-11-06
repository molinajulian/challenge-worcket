const app = require('./app');
const logger = require('./app/logger');
const { port } = require('./config').api;

Promise.resolve()
  .then(() => {
    app.listen(port);
    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
