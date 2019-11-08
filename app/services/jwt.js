const jwt = require('jsonwebtoken');

const { promisify } = require('../helpers/bluebird');
const { secret, expireValue, expireUnit } = require('../../config').authentication;

exports.signIn = payload =>
  promisify(jwt.sign)(payload, secret, { expiresIn: `${expireValue}${expireUnit}` });

exports.decode = token => promisify(jwt.verify)(token, secret);
