const { After } = require('@wdio/cucumber-framework');
const commonAPICalls = require('./common-api-calls');

After("@negative", async () => {
  console.log('After Hook call for Negative GRH1 API Scenarios');
  await commonAPICalls.updateMinParcelArea("GRH1", 2);
  await commonAPICalls.updateMaxParcelArea("GRH1", 25);
});
