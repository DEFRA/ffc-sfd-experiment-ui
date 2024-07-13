const isDocker = process.env.RUNNING_IN_DOCKER === 'true';
const chromeBinaryPath = process.env.CHROME_BINARY_PATH || '/usr/bin/google-chrome';  // Adjust this path based on your system

export const config = {
    runner: 'local',
    specs: [
        './features/*.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome',
            'goog:chromeOptions': {
                binary: isDocker ? undefined : chromeBinaryPath,
                args: isDocker
                    ? [
                        '--headless',
                        '--no-sandbox',
                        '--disable-gpu',
                        '--disable-dev-shm-usage',
                        '--disable-software-rasterizer',
                        '--disable-setuid-sandbox',
                        '--window-size=1920,1080'
                    ]
                    : []
            }
        }
    ],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost:3600',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'cucumber',
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
        useCucumberStepReporter: true
    }], 'spec'],
    cucumberOpts: {
        require: ['./features/step-definitions/farmer-journey-steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000
            );

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);

                if (exitCode !== 0) {
                    return reject(reportError);
                }

                console.log('Allure report successfully generated');
                resolve();
            });
        });
    }
};
