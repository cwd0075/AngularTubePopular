'use strict';

angular.module("myTube", [
	'ngRoute',
	'720kb.datepicker',
	'myTube.videolist',
	'myTube.citylist',
	'myTube.watchvid',
	'myTube.modelservices'
	])
.constant('VERSION', 1.1)
.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when("/", {templateUrl: "videolist/videolist.html", controller: "videolistCtrl"}).
		when("/watch/:id", {templateUrl: "watchvid/watchvid.html", controller: "watchvidCtrl"}).
		when("/city/:xy", {templateUrl: "videolist/videolist.html", controller: "citylistCtrl"}).
		otherwise({redirectTo: "/"});
}])
.controller('SearchFormCtrl',['$scope', '$log', 'ytUpdateSearchDate', function($scope, $log, ytUpdateSearchDate){
	$scope.search = function(){
		$scope.page_load_error = "";
		var err = ytUpdateSearchDate($scope.dateafter, $scope.datebefore);
		if (err)
		{
			if (err.code == "missing_date")
                    $scope.page_load_error = "You need to give a date";
                else if (err.code == "invalid_date_sequence")
                    $scope.page_load_error = "Date after is no later than date before";
                else 
                    $scope.page_load_error = "A completely unexpected error occurred: " + err.code;
		}
	};

}]);
