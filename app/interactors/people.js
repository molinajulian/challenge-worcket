const { getPersons } = require('../services/swapi');
const { setKey, getKey } = require('../services/redis');
const { mapEntity } = require('../mappers/swapi');
const { Promise } = require('../helpers/bluebird');

const obtainPersons = () =>
  getPersons()
    .then(({ count, results }) => {
      const pages = Math.ceil(count / results.length);
      const personsAccumulator = mapEntity(results);
      const remainingPages = Array.from(Array(pages + 1).keys()).slice(2);
      return Promise.reduce(
        remainingPages,
        (previous, current) =>
          getPersons({ page: current }).then(nextPeople => [...previous, ...mapEntity(nextPeople.results)]),
        personsAccumulator
      );
    })
    .then(allPersons => setKey({ key: 'people', value: JSON.stringify(allPersons) }).then(() => allPersons));

exports.getPeople = () =>
  getKey({ key: 'people' }).then(responseCached =>
    Promise.resolve((responseCached && JSON.parse(responseCached)) || obtainPersons())
  );
