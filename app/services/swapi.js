const { request } = require('../helpers/request');

exports.getPersons = qs => request({ endpoint: 'people', qs });
