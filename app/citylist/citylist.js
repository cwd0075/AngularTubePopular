'use strict';

angular.module("myTube.citylist",[])
	.controller('citylistCtrl', ['$scope', 'getCities', 'getVideosByCity', '$routeParams', function($scope, getCities, getVideosByCity, $routeParams){
		
    	getCities().then(function(results) {
        	$scope.cityList = results;
     	});

     	getVideosByCity($routeParams.xy).then(function(results) {
        	$scope.videos = results;
     	});

	}]);
