**Webdriver IO Acceptance tests for the end-to-end journey of the application**

To run the tests on your local machine, from this folder, ensure chromedriver is set on your local and install other dependencies by running:

```bash
npm install
```
Bring the UI and API services up

Then run the tests using following command, this will launch the tests on the Chrome browser:

```bash
export API_PORT=3000
npm run test 
```

To generate reports:

```bash
npm run generate-report:allure
```