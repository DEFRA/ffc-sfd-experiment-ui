const Joi = require('joi')

const sharedConfigSchema = {
  appInsights: Joi.object(),
  host: Joi.string().default('localhost'),
  password: Joi.string(),
  username: Joi.string(),
  useCredentialChain: Joi.bool().default(false)
}

const messageConfigSchema = Joi.object({
  projectDetailsQueue: {
    address: Joi.string().default('projectDetailsQueue'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  contactDetailsQueue: {
    address: Joi.string().default('contactDetails'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantRequestQueueAddressSf: {
    address: Joi.string().default('grantRequestQueueAddressSf'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantResponseQueueAddressSf: {
    address: Joi.string().default('grantResponseQueueAddressSf'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantRequestQueueAddressSnd: {
    address: Joi.string().default('grantRequestQueueAddressSnd'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantResponseQueueAddressSnd: {
    address: Joi.string().default('grantResponseQueueAddressSnd'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantRequestQueueAddressSn: {
    address: Joi.string().default('grantRequestQueueAddressSn'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantResponseQueueAddressSn: {
    address: Joi.string().default('grantResponseQueueAddressSn'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantRequestQueueAddressPega: {
    address: Joi.string().default('grantRequestQueueAddressPega'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  grantResponseQueueAddressPega: {
    address: Joi.string().default('grantResponseQueueAddressPega'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  desirabilitySubmittedTopic: {
    address: Joi.string().default('desirabilitySubmittedTopic'),
    type: Joi.string(),
    ...sharedConfigSchema
  },
  desirabilitySubmittedMsgType: Joi.string(),
  fetchGrantsRequestMsgType: Joi.string(),
  fetchApplicationRequestMsgType: Joi.string(),
  eligibilityAnswersMsgType: Joi.string(),
  contactDetailsMsgType: Joi.string(),
  msgSrc: Joi.string()
})

const sharedConfig = {
  appInsights: require('applicationinsights'),
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  useCredentialChain: process.env.NODE_ENV === 'production'
}

const msgTypePrefix = 'uk.gov.ffc.grants' // ' '

const config = {
  projectDetailsQueue: {
    address: process.env.PROJECT_DETAILS_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  contactDetailsQueue: {
    address: process.env.CONTACT_DETAILS_QUEUE_ADDRESS,
    type: 'queue',
    ...sharedConfig
  },
  grantRequestQueueAddressSf: {
    address: process.env.GRANTS_REQUEST_QUEUE_ADDRESS_SF,
    type: 'queue',
    ...sharedConfig
  },
  grantResponseQueueAddressSf: {
    address: process.env.GRANTS_RESPONSE_QUEUE_ADDRESS_SF,
    type: 'queue',
    ...sharedConfig
  },
  grantRequestQueueAddressSnd: {
    address: process.env.GRANTS_REQUEST_QUEUE_ADDRESS_SND,
    type: 'queue',
    ...sharedConfig
  },
  grantResponseQueueAddressSnd: {
    address: process.env.GRANTS_RESPONSE_QUEUE_ADDRESS_SND,
    type: 'queue',
    ...sharedConfig
  },
  grantRequestQueueAddressSn: {
    address: process.env.GRANTS_REQUEST_QUEUE_ADDRESS_SN,
    type: 'queue',
    ...sharedConfig
  },
  grantResponseQueueAddressSn: {
    address: process.env.GRANTS_RESPONSE_QUEUE_ADDRESS_SN,
    type: 'queue',
    ...sharedConfig
  },
  grantRequestQueueAddressPega: {
    address: process.env.GRANTS_REQUEST_QUEUE_ADDRESS_PEGA,
    type: 'queue',
    ...sharedConfig
  },
  grantResponseQueueAddressPega: {
    address: process.env.GRANTS_RESPONSE_QUEUE_ADDRESS_PEGA,
    type: 'queue',
    ...sharedConfig
  },
  desirabilitySubmittedTopic: {
    address: process.env.DESIRABILITY_SUBMITTED_TOPIC_ADDRESS,
    type: 'topic',
    ...sharedConfig
  },
  desirabilitySubmittedMsgType: `${msgTypePrefix}.slurry.desirability.notification`,
  fetchGrantsRequestMsgType: `${msgTypePrefix}.fetch.grants.request`,
  fetchApplicationRequestMsgType: `${msgTypePrefix}.fetch.application.request`,
  eligibilityAnswersMsgType: `${msgTypePrefix}.slurry.eligibility.details`,
  contactDetailsMsgType: `${msgTypePrefix}.slurry.contact.details`,
  msgSrc: 'ffc-future-grants-tech-evaluation'
}

// Validate config
const result = messageConfigSchema.validate(config, {
  abortEarly: false
})

// // Throw if config is invalid
if (result.error) {
  throw new Error(`The message config is invalid. ${result.error.message}`)
}

module.exports = result.value
