const jwt = require('jsonwebtoken');

const { secret, expireValue, expireUnit } = require('../../config').authentication;
const { badToken } = require('../errors/builders');

exports.signIn = payload => jwt.sign(payload, secret, { expiresIn: `${expireValue}${expireUnit}` });

exports.decode = token => jwt.verify(token, secret);
