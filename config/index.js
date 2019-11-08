const dotenv = require('dotenv');

const environment = process.env.NODE_ENV || 'development';

if (environment !== 'production') dotenv.config();

module.exports = {
  api: {
    bodySizeLimit: process.env.API_BODY_SIZE_LIMIT || 1024 * 1024 * 10,
    parameterLimit: process.env.API_PARAMETER_LIMIT || 10000,
    port: process.env.PORT || 8080,
    ttlCache: process.env.TTL_CACHE || 86400
  },
  swapi: {
    url: process.env.SWAPI_URL
  },
  authentication: {
    headerName: process.env.AUTH_HEADER_NAME || 'authorization',
    secret: process.env.AUTH_SECRET || 'super secret',
    expireUnit: process.env.AUTH_EXPIRES_UNIT || 'h',
    expireValue: process.env.AUTH_EXPIRE_VALUE || 1
  }
};
