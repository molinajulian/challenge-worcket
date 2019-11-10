jest.mock('request-promise');
const rp = require('request-promise');

const { personMapped, person, film, specificPerson } = require('../helpers/faker');

exports.mockPeopleResponse = ({ count, limit }) => {
  const sizeImplementations = Math.ceil(count / limit);
  rp.mockResolvedValueOnce({ count, results: personMapped(limit) });
  const iterations = Array.from(Array(sizeImplementations + 1).keys()).slice(2);
  iterations.forEach(() => rp.mockResolvedValueOnce({ results: personMapped(limit) }));
};
exports.mockFailedRequest = err => rp.mockRejectedValueOnce(err);

exports.mockPersonResponse = () => {
  rp.mockResolvedValueOnce(person());
  rp.mockResolvedValueOnce(specificPerson());
  rp.mockResolvedValueOnce(film());
  rp.mockResolvedValueOnce(specificPerson());
  rp.mockResolvedValueOnce(specificPerson());
  rp.mockResolvedValueOnce(specificPerson());
};

exports.requestPromiseMock = rp;
