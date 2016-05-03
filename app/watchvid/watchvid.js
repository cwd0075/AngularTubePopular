'use strict';

angular.module("myTube.watchvid",[])
	.controller('watchvidCtrl', ['$scope', '$routeParams', '$sce', 'getVideo', function($scope, $routeParams, $sce, getVideo){
		
		
		getVideo($routeParams.id).then(function(results) {
        	$scope.videoWatch = results;
		});
		
		$scope.trustSrc = function(src) {
    		return $sce.trustAsResourceUrl(src);
    	};
		
    	
	}]);