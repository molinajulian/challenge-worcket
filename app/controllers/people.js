const { getPeople } = require('../interactors/people');

exports.getAllPersons = (req, res, next) => getPeople().then(response => res.status(200).send(response));
