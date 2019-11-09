const faker = require('faker');

exports.email = () => faker.internet.email();

exports.personMapped = count =>
  Array.from(Array(count).keys()).map(() => ({
    url: `www.swapi.com/people/${faker.random.number({ min: 1, max: 9 })}`,
    name: faker.lorem.sentence()
  }));

exports.specificPerson = () => ({
  url: `www.swapi.com/people/${faker.random.number({ min: 1, max: 9 })}`,
  name: faker.lorem.sentence()
});

exports.person = () => ({
  name: faker.lorem.sentence(),
  heigth: faker.random.number.toString(),
  mass: faker.random.number.toString(),
  hair_color: faker.random.word(),
  skin_color: faker.random.word(),
  eye_color: faker.commerce.color,
  birth_year: faker.date.recent.toString(),
  gender: faker.random.word(),
  homeworld: `www.swapi.com/planets/${faker.random.number({ min: 1, max: 9 })}`,
  films: [`www.swapi.com/films/${faker.random.number({ min: 1, max: 9 })}`],
  species: [`www.swapi.com/species/${faker.random.number({ min: 1, max: 9 })}`],
  vehicles: [`www.swapi.com/vehicles/${faker.random.number({ min: 1, max: 9 })}`],
  starships: [`www.swapi.com/starships/${faker.random.number({ min: 1, max: 9 })}`],
  url: `www.swapi.com/people/${faker.random.number({ min: 1, max: 9 })}`
});

exports.film = () => ({
  title: faker.lorem.sentence(),
  url: `www.swapi.com/people/${faker.random.number({ min: 1, max: 9 })}`
});
