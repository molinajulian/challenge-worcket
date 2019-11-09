jest.mock('node-cache');
const cache = require('node-cache');
cache.mockImplementation(() => ({
  get: () => {},
  set: () => {}
}));
