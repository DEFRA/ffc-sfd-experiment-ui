const appInsights = require('./app-insights')
const { getYarValue } = require('../helpers/session')

const blockDefaultPageViews = ['login', 'start', 'applying', 'session-timeout'] // -- blocked pages
const isBlockDefaultPageView = (url) => {
  const currentUrl = url.split('/').pop().toString().toLowerCase()
  return blockDefaultPageViews.indexOf(currentUrl) >= 0 && !url.includes('assets')
}

const grant_type = 'Slurry Infrastructure'

const eventTypes = {
  PAGEVIEW: 'pageview',
  ELIGIBILITIES: 'eligibilities',
  ELIGIBILITY: 'eligibility_passed',
  CONFIRMATION: 'confirmation',
  ELIMINATION: 'elimination',
  EXCEPTION: 'exception'
}

const sendGAEvent = async (request, metrics) => {
  const timeSinceStart = getTimeofJourneySinceStart(request).toString()
  const page_path = request.route.path
  const host_name = request.info.hostname
  const { name, params } = metrics
  const isEliminationEvent = name === eventTypes.ELIMINATION
  const isEligibilityEvent = name === eventTypes.ELIGIBILITY
  const isConfirmationEvent = name === eventTypes.CONFIRMATION
  const isEligibilitiesEvent = name === eventTypes.ELIGIBILITIES
  const dmetrics = {
    ...params,
    ...(isEliminationEvent && { elimination_time: timeSinceStart }),
    ...(isEligibilityEvent && { eligibility_time: timeSinceStart }),
    ...(isEligibilitiesEvent && { reference_cost: 'Eligible' }),
    ...(isConfirmationEvent && { final_score: 'Eligible', user_type: getYarValue(request, 'applying'), confirmation_time: timeSinceStart }),
    grant_type,
    page_title: page_path,
    host_name
  }
  try {
    const event = { name, params: dmetrics }
    await request.ga.view(request, [event])
    console.log('Metrics Sending analytics %s for %s', name, request.route.path)
  } catch (err) {
    appInsights.logException(request, { error: err })
  }
  console.log('[ %s MATRIC SENT ]', name.toUpperCase())
}

const getTimeofJourneySinceStart = (request) => {
  if (getYarValue(request, 'journey-start-time')) {
    return Math.abs(((new Date()).getTime() - (new Date(getYarValue(request, 'journey-start-time'))).getTime()) / 1000)
  }
  return 0
}

module.exports = {
  isBlockDefaultPageView,
  sendGAEvent,
  eventTypes
}
