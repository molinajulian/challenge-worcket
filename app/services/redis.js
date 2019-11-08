const redis = require('redis');

const { promisifyAll } = require('../helpers/bluebird');
const { host, port, password } = require('../../config').redis;
const { redisHandler } = require('../errors/handlers');

const client = redis.createClient({ host, port, password });
promisifyAll(redis.RedisClient.prototype);

exports.getKey = ({ key }) => client.getAsync(key).catch(redisHandler);

exports.setKey = ({ key, value }) => client.setAsync(key, value).catch(redisHandler);
