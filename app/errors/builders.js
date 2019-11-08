const { NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, SWAPI_DEFAULT_ERROR } = require('./internal_codes');

const buildError = (message, internalCode) => ({ message, internalCode });

exports.notFound = message => buildError(message, NOT_FOUND);
exports.internalError = message => buildError(message, INTERNAL_SERVER_ERROR);
exports.badRequest = message => buildError(message, BAD_REQUEST);
exports.swapiDefaultError = message => buildError(message, SWAPI_DEFAULT_ERROR);
