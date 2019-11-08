const NodeCache = require('node-cache');

const { DEFAULT_CACHE_TTL_SEC } = require('../constants');

const cache = new NodeCache({ stdTTL: DEFAULT_CACHE_TTL_SEC });

exports.getKey = ({ key }) => Promise.resolve(cache.get(key));

exports.setKey = ({ key, value }) => Promise.resolve(cache.set(key, value));
