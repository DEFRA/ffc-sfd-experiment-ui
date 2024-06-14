const { MessageSender } = require('ffc-messaging')
const msgCfg = require('../config/messaging')
const protectiveMonitoringServiceSendEvent = require('../services/protective-monitoring-service-email')
const contactDetailsSender = new MessageSender(msgCfg.contactDetailsQueue)
const desirabilitySubmittedSender = new MessageSender(msgCfg.desirabilitySubmittedTopic)
async function stop () {
  await contactDetailsSender.closeConnection()
  await desirabilitySubmittedSender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function sendMsg (sender, msgData, msgType, correlationId) {
  try {
    const msg = {
      body: msgData,
      type: msgType,
      source: msgCfg.msgSrc,
      correlationId
    }
    await sender.sendMessage(msg)
    console.log('sending message', msg)
  } catch (e) {
    console.log('[ERROR ON SENDER]', e)
  }
}

module.exports = {
  sendDesirabilitySubmitted: async function (desirabilitySubmittedData, correlationId) {
    await sendMsg(
      desirabilitySubmittedSender,
      desirabilitySubmittedData,
      msgCfg.desirabilitySubmittedMsgType,
      correlationId
    )
    await protectiveMonitoringServiceSendEvent(correlationId, 'FTF-DATA-SUBMITTED', '0703')
  }
}
