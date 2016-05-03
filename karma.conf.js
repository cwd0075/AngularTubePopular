module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angularjs-datepicker/src/js/angular-datepicker.js',
      'app/components/*.js',
      'app/citylist/*.js',
      'app/watchvid/*.js',
      'app/*.js',
      'app/videolist/*.js'
    ],

    autoWatch : false,
    colors : true,
    singleRun : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
