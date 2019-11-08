const { request } = require('../helpers/request');
const { swapiHandler } = require('../errors/handlers');

exports.getPersons = qs => request({ endpoint: 'people', qs }).catch(swapiHandler);

exports.getPerson = ({ id }) => exports.getEntity({ id });

exports.getEntity = ({ entity = 'people', id }) =>
  request({ endpoint: `${entity}/${id}` }).catch(swapiHandler);
