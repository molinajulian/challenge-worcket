const errors = require('./errors');
const users = require('./users');
const people = require('./people');

module.exports = { ...errors, ...users, ...people };
