(function (){
	
	var app = angular.module("my500pxViewer");
	
	var MyPhotoDetailController = function($scope, $http, $log, $routeParams) {
		
		var onPhotoGet = function(response){
			$scope.photoDetails = response.data; 
		}; 
		
		var onError = function(reason){
			$scope.error = "Could not fetch the data."; 
		}; 


		var getPhoto = function(){
			console.log('MyPhotoDetailController in getPhoto');
			$http.get("https://api.500px.com/v1/photos/" + $routeParams.photoid + "?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&comments=1" )
				.then(onPhotoGet, onError);
		};
		
		getPhoto();

	}
	
	app.controller("MyPhotoDetailController", ["$scope", "$http", "$log", "$routeParams", MyPhotoDetailController]);
	
}());
