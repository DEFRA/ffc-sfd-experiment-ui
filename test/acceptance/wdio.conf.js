const allure = require('allure-commandline');
const fs = require('fs');

const isAllureReportingEnabled = !process.env.DISABLE_ALLURE_REPORTING;

export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 1,
            acceptInsecureCerts: true,
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--no-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--window-size=1920,1080',
                    process.env.HEADLESS ? '--headless' : '' // Add headless argument if HEADLESS environment variable is set
                ].filter(Boolean) // Remove empty strings
            }
        }
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'cucumber',

    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    // Whether or not retried spec files should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    reporters: [
        ...(isAllureReportingEnabled ? [['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            useCucumberStepReporter: true
        }]] : []),
        'spec'
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/farmer-journey-steps.js',
                  './features/utils/hooks.js'],
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

    //
    // =====
    // Hooks
    // =====
    onPrepare: function() {
        if (isAllureReportingEnabled) {
            const dir = 'allure-results';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
        }
    },

    onComplete: function() {
        if (isAllureReportingEnabled) {
            const reportError = new Error('Could not generate Allure report');
            const generation = allure(['generate', 'allure-results', '--clean']);
            return new Promise((resolve, reject) => {
                const generationTimeout = setTimeout(
                    () => reject(reportError),
                    5000
                );

                generation.on('exit', function (exitCode) {
                    clearTimeout(generationTimeout);

                    if (exitCode !== 0) {
                        return reject(reportError);
                    }

                    console.log('Allure report successfully generated');
                    resolve();
                });
            });
        }
    }

};
