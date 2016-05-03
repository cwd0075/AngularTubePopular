'use strict';
angular.module("myTube.modelservices",[])
	.value('searchDate', {after:"2016-01-01", before:"2016-12-31"})
	.constant('YT_EMBED_URL',   'http://www.youtube.com/embed/{ID}?autoplay=1')
	.constant('YT_VIDEO_URL',   'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4&type=video&maxResults=48&q=')
	.constant('YT_ONE_VIDEO_URL', 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4&type=video')
	.constant('YT_VIDEO_COUNT_URL', 'https://www.googleapis.com/youtube/v3/videos?part=statistics%2C+snippet&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4')
	.constant('YT_VIDEO_CITY_URL', 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&key=AIzaSyCl3iyhmnx5ZUPKoVoDSJWNyJEdZi1jNR4&type=video&maxResults=48&q=&locationRadius=25km')
	.factory('getVideos', ['$http', '$q', '$log', 'ytVideoPrepare', 'YT_VIDEO_URL', function($http, $q, $log, ytVideoPrepare, YT_VIDEO_URL){
		return function(){
			var defer = $q.defer();

			$http.get(YT_VIDEO_URL,{
		        params: {
		          
		          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high'
		        	}
		      	})
				.success(function(response){

					var results = [];
		          	angular.forEach(response.items, function(entry) {
		             results.push(ytVideoPrepare(entry));
		            });
		          $log.info(response);
		          defer.resolve(results);
		         
		 		});
			return defer.promise;
		};
	}])
	.factory('getVideo', ['$http', '$q', '$log', 'YT_VIDEO_COUNT_URL', 'ytVideoPrepare', function($http, $q, $log, YT_VIDEO_COUNT_URL, ytVideoPrepare){
		return function(vidID){
			var defer = $q.defer();

			$http.get(YT_VIDEO_COUNT_URL,{
		        params: {
		          id: vidID,
		          fields: 'items/statistics,items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high'
		          }
		      	})
				.success(function(response){
		    	  var results = [];
		          $log.info(response);
		          angular.forEach(response.items, function(entry) {
		             results.push(ytVideoPrepare(entry));
		            });
		          
		          defer.resolve(results[0]);
		        });
			return defer.promise;
		};
	}])
	.factory('getVideosByCity', ['$http', '$q', '$log', 'ytVideoPrepare', 'YT_VIDEO_CITY_URL', 'searchDate', function($http, $q, $log, ytVideoPrepare, YT_VIDEO_CITY_URL, searchDate){
		return function(cityXY){
			var defer = $q.defer();
			
			var pAfter, pBefore;
			
			pAfter = (searchDate.after+'T00:00:00Z');
			pBefore = (searchDate.before+'T00:00:00Z');
			$log.info(pAfter);
			$log.info(pBefore);
			
			$http.get(YT_VIDEO_CITY_URL,{
		        params: {
		          publishedAfter: pAfter,
		          publishedBefore: pBefore, 
		          location: cityXY,
		          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high'
		        	}
		      	})
				.success(function(response){

				  	var results = [];
		          	angular.forEach(response.items, function(entry) {
		             results.push(ytVideoPrepare(entry));
		            });
		          	$log.info(response);
		          	defer.resolve(results);
		        });
			return defer.promise;
		};
	}])
	.factory('getCities', ['$http', '$q', '$log', function($http, $q, $log){
		return function(){
			var defer = $q.defer();

			$http.get("json/cities.json")
				.success(function(response){
				  $log.info(response);
		          defer.resolve(response);
		        });
			return defer.promise;
		};
	}])
	.factory('ytVideoPrepare',['ytCreateEmbedURL', function(ytCreateEmbedURL){
		return function(entry){
	      var id          = entry.id.videoId || entry.id
	      var thumbnails  = [];
	      function numberWithCommas(x) {
 		   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		  }
	      var hqVideo;
	      //angular.forEach($media.media$thumbnail || [], function(thumb) {
	        var image = {
	          width : entry.snippet.thumbnails.high.width,
	          height : entry.snippet.thumbnails.high.height,
	          url : entry.snippet.thumbnails.high.url,
	          name : 'high'
	        };
	        
	        thumbnails.push(image);
	      

	      return {
	        id : id,
	        image : thumbnails[0],
	        thumbnails : thumbnails,
	        title : entry.snippet.title,
	        description : entry.snippet.description,
	        viewCount : entry.hasOwnProperty('statistics') ? numberWithCommas(entry.statistics.viewCount) : '0',
	        rating : 0,
	        keywords : 'keywords',
	        embedUrl : ytCreateEmbedURL(id)
	      }
		};

	}])

	.factory('ytCreateEmbedURL',['YT_EMBED_URL', function(YT_EMBED_URL){
		return function(id){
			return YT_EMBED_URL.replace('{ID}', id);
		};
	}])
	.factory('ytUpdateSearchDate',['ytCheckDate', 'searchDate', function(ytCheckDate, searchDate){
		return function(d_after, d_before){
			var err = ytCheckDate (d_after, d_before);
			if (!err)
			{
				searchDate.after = d_after;
				searchDate.before = d_before;
			}
			return err; 
		};
	}])
	.factory('ytCheckDate', ['$log', function($log){
		return function(d_after, d_before){
			var d1 = new Date(d_after);
			var d2 = new Date(d_before);
			var err = null;
			if (!d_after || !d_before) err={code: 'missing_date'};
			if (d1>=d2) err={code: 'invalid_date_sequence'};
			return err;
		};

	}]);

	// factory prototype
	// .factory('factoryName',['injectDep', function(injectDep){
	// 	return function(Argument){
	// 		return obj;
	// 	};
	// }]);

     
