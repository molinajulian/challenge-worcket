const { swapiDefaultError, notFound } = require('../errors/builders');

exports.swapiHandler = error => {
  const defaultError = () => {
    throw swapiDefaultError('Internal server error from swapi');
  };
  if (error.statusCode) {
    const errorFunction = {
      404: () => {
        throw notFound('The resource does not exist');
      },
      500: () => defaultError()
    }[error.statusCode];
    (errorFunction && errorFunction()) || defaultError();
  } else throw defaultError(error.message);
};

exports.redisHandler = error => {
  if (error.statusCode) {
    const errorFunction = {
      400: () => defaultError(error.message)
    }[error.statusCode];
    (errorFunction && errorFunction()) || defaultError(error.message);
  } else throw defaultError(error.message);
};
