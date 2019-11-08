const { inspect } = require('util');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
  SWAPI_DEFAULT_ERROR,
  SCHEMA_ERROR,
  UNAUTHORIZED
} = require('../errors/internal_codes');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [INTERNAL_SERVER_ERROR]: 500,
  [NOT_FOUND]: 404,
  [BAD_REQUEST]: 400,
  [SWAPI_DEFAULT_ERROR]: 500,
  [SCHEMA_ERROR]: 422,
  [UNAUTHORIZED]: 401
};

exports.handle = (error, _, res, next) => {
  if (error.internalCode) {
    res.status(statusCodes[error.internalCode]);
  } else res.status(DEFAULT_STATUS_CODE);
  logger.error(inspect(error));
  return res.send({ message: error.message, internal_code: error.internalCode || INTERNAL_SERVER_ERROR });
};
