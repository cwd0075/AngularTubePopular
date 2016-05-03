'use strict';

angular.module("myTube.videolist",[])
	.controller('videolistCtrl', ['$scope', 'getVideos', 'getCities', function($scope, getVideos, getCities){
		
    	getVideos().then(function(results) {
        	$scope.videos = results;
     	});

     	getCities().then(function(results) {
        	$scope.cityList = results;
        });	
	}]);



// Todo:
// Add view count in watchvid template
// Update the display to match original ng-Tube


