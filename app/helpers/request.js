const rp = require('request-promise');

const { url: swapiUrl } = require('../../config').swapi;

const buildRequest = ({ method = 'GET', url = swapiUrl, endpoint, qs }) => {
  const defaultOptions = {
    method,
    uri: `${url}/${endpoint}`,
    json: true,
    qs
  };
  return defaultOptions;
};

exports.request = options => rp(buildRequest(options)).catch(console.log);
