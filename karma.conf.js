// Karma configuration
// Generated on Thu May 10 2018 00:49:27 GMT-0500 (CDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'recipes/static/recipes/js/*.js',
            'recipes/static/recipes/js/controllers/*.js',
            'recipes/static/recipes/js/filters/*.js',
            'recipes/static/recipes/js/services/*.js',
            'recipes/tests/static/recipes/js/controllers/*.js',
            'recipes/tests/static/recipes/js/filters/*.js',
            'recipes/tests/static/recipes/js/services/*.js'
        ],


        // list of files / patterns to exclude
        exclude: [],


        // pre-process matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // development source files to generate coverage for, not external libraries
            'recipes/static/recipes/js/*.js': ['coverage'],
            'recipes/static/recipes/js/controllers/*.js': ['coverage'],
            'recipes/static/recipes/js/filters/*.js': ['coverage'],
            'recipes/static/recipes/js/services/*.js': ['coverage'],
            'recipes/tests/static/recipes/js/controllers/*.js': ['coverage'],
            'recipes/tests/static/recipes/js/filters/*.js': ['coverage'],
            'recipes/tests/static/recipes/js/services/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome', 'Firefox'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // optionally, configure the reporter
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'html', subdir: 'report-html'},
                {type: 'json', subdir: './', file: 'coverage.json'}
            ]
        }

    });
};
