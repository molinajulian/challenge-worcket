const { request } = require('../helpers/request');

exports.getPersons = qs => request({ endpoint: 'people', qs });

exports.getPerson = ({ id }) => exports.getEntity({ id });

exports.getEntity = ({ entity = 'people', id }) => request({ endpoint: `${entity}/${id}` });
