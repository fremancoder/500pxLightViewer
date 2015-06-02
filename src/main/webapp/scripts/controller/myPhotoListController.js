(function (){
	
	var app = angular.module("my500pxViewer");
	
	var MyPhotoListController = function($scope, $http, $log, $location, $rootScope, $cookieStore) {
		
		var onPhotoComplete = function(response){
			if(response.data.current_page == 1){
				$scope.myPhotos = response.data.photos;
			} else {
				var tempPhotos = $scope.myPhotos; 
				$scope.myPhotos = tempPhotos.concat(response.data.photos);
			}
			if(response.data.current_page < response.data.total_pages){
				search(response.data.current_page + 1);
			}
		}; 
		
		var onError = function(reason){
			$scope.error = "No photos in your collection, or something went wrong when getting the list: " ; 
		}; 

		var search = function(page) {
			$rootScope.menuOption = 'list';
			$http.get("https://api.500px.com/v1/photos?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&feature=user&username="+$rootScope.globals.currentUser.username+"&rpp=100&page="+page)
				.then(onPhotoComplete, onError);
		};
		
		$scope.showDetails = function(photoid){
			$location.path("/myPhotoDetails/" + photoid);
		};
		
		search(1);
	}
	
	app.controller("MyPhotoListController", ["$scope", "$http", "$log", "$location", "$rootScope", "$cookieStore", MyPhotoListController]);
	
}());
