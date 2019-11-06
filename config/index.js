const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'development';

if (environment !== 'production') dotenv.config();

module.exports = {
  api: {
    bodySizeLimit: process.env.API_BODY_SIZE_LIMIT || 1024 * 1024 * 10,
    parameterLimit: process.env.API_PARAMETER_LIMIT || 10000,
    port: process.env.PORT || 8080
  }
};
