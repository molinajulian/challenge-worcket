const { decode } = require('../services/jwt');
const { headerName } = require('../../config').authentication;
const { unauthorized } = require('../errors/builders');
const { ADMIN } = require('../constants');

exports.verifyToken = async (req, res, next) => {
  try {
    if (!(req.headers && req.headers[headerName])) {
      throw unauthorized('The user is not authorized');
    }
    req.user = await decode(req.headers[headerName].split(' ')[1]);
    next();
  } catch (err) {
    next(err);
  }
};

exports.verifyPermissions = ({ params: { id }, user: { type } }, res, next) =>
  id && type !== ADMIN ? next(unauthorized('The user is not authorized')) : next();
