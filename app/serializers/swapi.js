const _ = require('lodash');

exports.mapPersonData = personData => _.omit(personData, ['created', 'edited', 'url']);
