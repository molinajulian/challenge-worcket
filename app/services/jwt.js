const jwt = require('jsonwebtoken');

const { promisify } = require('../helpers/bluebird');
const { secret, expireValue, expireUnit } = require('../../config').authentication;
const { badToken } = require('../errors/builders');

exports.signIn = payload =>
  promisify(jwt.sign)(payload, secret, { expiresIn: `${expireValue}${expireUnit}` });

exports.decode = token =>
  promisify(jwt.verify)(token, secret).catch(error => {
    throw badToken(error.message);
  });
