const { inspect } = require('util');

const { getPersons, getEntity, getPerson } = require('../services/swapi');
const { setKey, getKey } = require('../services/redis');
const { mapEntity, getIdFromUrl } = require('../mappers/swapi');
const { Promise } = require('../helpers/bluebird');
const logger = require('../logger');

const setNewData = ({ data, key }) =>
  setKey({ key, value: JSON.stringify(data) }).then(() => {
    logger.info('Data was saved successfully');
    return data;
  });

const obtainPersons = () => {
  logger.info('Trying to obtain first page');
  return getPersons()
    .then(({ count, results }) => {
      logger.info('First page obtained successfully');
      const pages = Math.ceil(count / results.length);
      const personsAccumulator = mapEntity(results);
      const remainingPages = Array.from(Array(pages + 1).keys()).slice(2);
      logger.info(`There are ${remainingPages.length} more pages`);
      return Promise.reduce(
        remainingPages,
        (previous, current) => {
          logger.info(`Trying to obtain page ${current}`);
          return getPersons({ page: current }).then(nextPeople => {
            logger.info(`Page obtained successfully`);
            return [...previous, ...mapEntity(nextPeople.results)];
          });
        },
        personsAccumulator
      );
    })
    .then(allPersons => {
      logger.info('People was obtained successfully');
      logger.info('Trying to save data in cache');
      return setNewData({ key: 'people', data: allPersons });
    });
};

const getPlanetData = ({ nestedData, personData }) => {
  const planetId = getIdFromUrl(personData['homeworld']);
  return getEntity({ entity: 'planets', id: planetId }).then(({ name }) => ({
    id: getIdFromUrl(personData.url),
    ...personData,
    homeworld: { id: planetId, name },
    ...nestedData
  }));
};

const getNestedData = personData => {
  logger.info(`Trying to obtain a nested data for person with name ${personData.name}`);
  return Promise.reduce(
    ['films', 'species', 'vehicles', 'starships'],
    (previous, nestedKey) => {
      logger.info(`Trying to obtain ${nestedKey} from person with name ${personData.name}`);
      return Promise.map(personData[nestedKey], url => {
        const id = getIdFromUrl(url);
        return getEntity({ entity: nestedKey, id }).then(({ name, title }) => ({
          id,
          name: name || title
        }));
      }).then(nestedKeyResult => {
        logger.info(`${nestedKey} was obtained successfully`);
        return { ...previous, [nestedKey]: nestedKeyResult };
      });
    },
    {}
  )
    .then(nestedData => {
      logger.info('Nested data obtained successfully');
      logger.info('Trying to obtain a planet data');
      return getPlanetData({ nestedData, personData });
    })
    .then(personData => {
      logger.info('Planet data obtained successfully');
      logger.info('Trying to save data in cache');
      return setNewData({ key: `person-${personData.id}`, data: personData });
    });
};

const obtainSpecificPerson = ({ id }) => getPerson({ id }).then(getNestedData);

const getSwapiData = ({ functionData = () => Promise.resolve, key, params }) => {
  logger.info('Trying to obtain cache data');
  return getKey({ key }).then(responseCached => {
    if (responseCached) {
      logger.info('Exist cache data and was obtained successfully');
      return Promise.resolve(JSON.parse(responseCached));
    }
    logger.info('The response does not exist in cache data');
    return functionData(params);
  });
};

exports.getPeople = () => {
  logger.info('Begin a process for obtain people');
  return getSwapiData({ functionData: obtainPersons, key: 'people' });
};

exports.getSpecificPerson = ({ id }) => {
  logger.info(`Begin a process for obtain a person with id ${id}`);
  return getSwapiData({ functionData: obtainSpecificPerson, key: `person-${id}`, params: { id } });
};
