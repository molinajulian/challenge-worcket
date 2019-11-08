const NodeCache = require('node-cache');

const { ttlCache } = require('../../config').api;

const cache = new NodeCache({ stdTTL: ttlCache });

exports.getKey = ({ key }) => Promise.resolve(cache.get(key));

exports.setKey = ({ key, value }) => Promise.resolve(cache.set(key, value));
