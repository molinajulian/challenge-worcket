const { checkSchema, validationResult } = require('express-validator');

const { schemaError } = require('../errors/builders');

exports.validateSchema = schema => [
  checkSchema(schema),
  (req, _, next) => {
    const errors = validationResult(req);
    return errors.isEmpty() ? next() : next(schemaError(errors));
  }
];
