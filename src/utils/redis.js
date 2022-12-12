/**
 * Set up redis connection
 */

const redis = require('redis');
const { CONSTANTS } = require('../config');
const logger = require('./logger');

// create redis client
const client = redis.createClient({
    url: `redis://${CONSTANTS.REDIS.REDIS_USER}:${CONSTANTS.REDIS.REDIS_PASSWORD}@${CONSTANTS.REDIS.REDIS_END_POINT}`,
});

client.on('connect', () => {
    logger.info('Redis connection successful.');
});

// connection
client.connect().catch((err) => {
    logger.error('Failed to connect to redis: ' + err.message);
});

module.exports = client;
