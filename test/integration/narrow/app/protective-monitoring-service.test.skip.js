describe('Protective monitoring service', () => {
  const { sendMonitoringEvent } = require('../../../../app/services/protective-monitoring-service')

  test('check sendEvent()', async () => {
    let request = { headers: { 'x-forwarded-for': 'mock,xforw,for' } }
    expect(await sendMonitoringEvent(request, 'sessionId', 'event', 'pmcCode')).toBe(undefined)
    request = {
      headers: { 'x-forwarded-for': '' },
      info: { remoteAddress: 'mock-addr' }
    }
    expect(await sendMonitoringEvent(request, 'sessionId', 'event', 'pmcCode')).toBe(undefined)
  })
})
