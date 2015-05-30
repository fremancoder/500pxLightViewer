(function (){
	
	var app = angular.module("my500pxViewer");
	
	var MyPhotoListController = function($scope, $http, $log, $location, $rootScope) {
		
		var onPhotoComplete = function(response){
			$scope.myPhotos = response.data;
		}; 
		
		var onError = function(reason){
			$scope.error = "No photos in your collection, or something went wrong wen getting the list: " ; 
		}; 

		var search = function() {
			console.log($rootScope.globals.currentUser.username);
			$http.get("https://api.500px.com/v1/photos?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&feature=user&username="+$rootScope.globals.currentUser.username+"&rpp=100")
				.then(onPhotoComplete, onError);
		};
		
		$scope.showDetails = function(photoid){
			$location.path("/myPhotoDetails/" + photoid);
		};
		
		search();
	}
	
	app.controller("MyPhotoListController", ["$scope", "$http", "$log", "$location", "$rootScope", MyPhotoListController]);
	
}());
