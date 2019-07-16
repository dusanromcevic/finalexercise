let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var CHdriver = [
    './drivers/chrome/chromedriver_win32(71)/chromedriver.exe',
    //'./drivers/chrome/chromedriver_win32(73)/chromedriver.exe', corrupt driver file probably
    './drivers/chrome/chromedriver_win32(74)/chromedriver.exe'
];
var MZdriver = [
    './drivers/gecko/geckodriver-v0.22.0-win64/geckodriver.exe',
    './drivers/gecko/geckodriver-v0.23.0-win64/geckodriver.exe',
    './drivers/gecko/geckodriver-v0.24.0-win64/geckodriver.exe'
];

exports.config = {

    //seleniumAddress: 'http://localhost:4444/wd/hub',

    directConnect: true,

    /* 
        capabilities: {
            //browserName: 'chrome',
            
            browserName: 'firefox', 
        },
     */


    //chromeDriver: CHdriver[0],

    //geckoDriver: MZdriver[2],

    multiCapabilities: [{
            browserName: 'chrome',
            //shardTestFiles: true,
            //maxInstances: 2,
            //exclude: [''],
        },
        {
            browserName: 'firefox',
            //shardTestFiles: true,
            //maxInstances: 2,
            //exclude: [''],
        }
    ],

    params: {
        login: {
            email: 'd.romcevic@levi9.com',
            password: 'Maj123456'
        }
    },

    baseUrl: 'https://www.shownieuws.nl/',

    specs: [
        'tests/cookies.consent.spec.js',
        'tests/search.design.form.spec.js',
        'tests/search.functionality.spec.js',
        'tests/search.results.spec.js'
    ],

    SELENIUM_PROMISE_MANAGER: false,

    jasmineNodeOpts: {
        print: function () {}, // Remove dot from terminal report
        showColors: true, // Use colors in the terminal report
    },

    onPrepare: () => {

        browser.ignoreSynchronization = true;

        browser.manage().window().maximize();

        jasmine.getEnv().addReporter(new SpecReporter({
            spec: {
                displayStacktrace: true
            }
        }));

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'target/screenshots'
            })
        );
    }
};