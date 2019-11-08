const { getPeople, getSpecificPerson } = require('../interactors/people');
const { mapPersonData } = require('../serializers/swapi');

exports.getAllPersons = (req, res, next) => getPeople().then(response => res.status(200).send(response));

exports.getPerson = ({ params: { id } }, res, next) =>
  getSpecificPerson({ id }).then(personData => res.status(200).send(mapPersonData(personData)));
