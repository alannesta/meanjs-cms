exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  // baseUrl: 'http://localhost:8000/',
  seleniumAddress: 'http://localhost:4444',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};