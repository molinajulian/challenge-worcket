const redis = require('redis');

const { promisifyAll } = require('../helpers/bluebird');
const { host, port, password } = require('../../config').redis;

const client = redis.createClient({ host, port, password });
promisifyAll(redis.RedisClient.prototype);

exports.client = client;

exports.getKey = ({ key }) => client.getAsync(key);

exports.setKey = ({ key, value }) => client.setAsync(key, value);
