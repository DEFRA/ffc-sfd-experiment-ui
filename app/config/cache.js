const Joi = require('joi')

require('dotenv').config()

// Define config schema
const schema = Joi.object({
  useRedis: Joi.bool().default(false),
  expiresIn: Joi.number().default(1200 * 1000), // 20 mins
  catboxOptions: Joi.object({
    host: Joi.string().required(),
    port: Joi.string().required(),
    password: Joi.string().allow(''),
    partition: Joi.string().required(),
    tls: Joi.object()
  })
})

const config = {
  useRedis: false,
  expiresIn: process.env.SESSION_CACHE_TTL,
  catboxOptions: {
    host: process.env.REDIS_HOSTNAME || 'redis',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD || '',
    partition: process.env.REDIS_PARTITION || 'ffc-sfd-experiment-ui',
    tls: process.env.NODE_ENV === 'production' ? {} : undefined
  }
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The cache config is invalid. ${result.error.message}`)
}

module.exports = result.value
