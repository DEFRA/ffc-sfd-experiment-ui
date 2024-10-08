**Webdriver IO Acceptance tests for the end-to-end journey of the application**

To run the tests on your local machine, from this folder, ensure chromedriver is set on your local and install other dependencies by running:

```bash
npm install
```

Then run the tests with:

```bash
export API_PORT=3000
npm run test 
```

To generate reports:

```bash
npm run generate-report:allure
```