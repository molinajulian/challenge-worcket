const { getPersons, getEntity, getPerson } = require('../services/swapi');
const { setKey, getKey } = require('../services/redis');
const { mapEntity, getIdFromUrl } = require('../mappers/swapi');
const { Promise } = require('../helpers/bluebird');

const setNewData = ({ data, key }) => setKey({ key, value: JSON.stringify(data) }).then(() => data);

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
    .then(allPersons => setNewData({ key: 'people', data: allPersons }));

const getPlanetData = ({ nestedData, personData }) => {
  const planetId = getIdFromUrl(personData['homeworld']);
  return getEntity({ entity: 'planets', id: planetId }).then(({ name }) => ({
    id: getIdFromUrl(personData.url),
    ...personData,
    homeworld: { id: planetId, name },
    ...nestedData
  }));
};

const getNestedData = personData =>
  Promise.reduce(
    ['films', 'species', 'vehicles', 'starships'],
    (previous, nestedKey) =>
      Promise.map(personData[nestedKey], url => {
        const id = getIdFromUrl(url);
        return getEntity({ entity: nestedKey, id }).then(({ name, title }) => ({
          id,
          name: name || title
        }));
      }).then(nestedKeyResult => ({ ...previous, [nestedKey]: nestedKeyResult })),
    {}
  )
    .then(nestedData => getPlanetData({ nestedData, personData }))
    .then(personData => setNewData({ key: `person-${personData.id}`, data: personData }));

const obtainSpecificPerson = ({ id }) => getPerson({ id }).then(getNestedData);

const getSwapiData = ({ functionData = () => Promise.resolve, key, params }) =>
  getKey({ key }).then(responseCached =>
    Promise.resolve((responseCached && JSON.parse(responseCached)) || functionData(params))
  );
exports.getPeople = () => getSwapiData({ functionData: obtainPersons, key: 'people' });

exports.getSpecificPerson = ({ id }) =>
  getSwapiData({ functionData: obtainSpecificPerson, key: `person-${id}`, params: { id } });
