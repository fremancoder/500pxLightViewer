(function (){
	
	var app = angular.module("my500pxViewer");
	
	var MyPhotoGridController = function($scope, $http, $log, $location, $rootScope, $routeParams) {
		
		var onPhotoComplete = function(response){
			if(response.data.current_page == 1){
				$scope.myPhotos = response.data.photos;
			} else {
				var tempPhotos = $scope.myPhotos; 
				$scope.myPhotos = tempPhotos.concat(response.data.photos);
			}
			if(response.data.current_page < response.data.total_pages){
				search(response.data.current_page + 1);
			} else {
				createGrid();
			}
			
		}; 
		
		var createGrid = function(){
			$scope.rows = [];
			var pi = 0; 
			var maxCols = 3;
			var maxRows = Math.floor($scope.myPhotos.length / maxCols);
			var rem = $scope.myPhotos.length % maxCols;
			if (rem > 0) {
				maxRows = maxRows + 1;
			}
			for( var i =0 ; i < maxRows;i++){
			    $scope.rows.push([]);
			    for( var j =0 ; j < maxCols;j++){
			        $scope.rows[i][j] = $scope.myPhotos[pi];
			        pi = pi + 1;
			    }
			}			
		}
		
		var onError = function(reason){
			$scope.error = "No photos in your collection, or something went wrong when getting the list: " ; 
		}; 

		var setSortOrder= function(){
			switch($routeParams.sortOrder){
				case 'created_at':
					$scope.sortOrder = 'CREATED AT';
					break;
				case 'highest_rating':
					$scope.sortOrder = 'HIGHEST PULSE';
					break;
				case 'times_viewed':
					$scope.sortOrder = 'TIMES VIEWED';
					break;
				case 'votes_count':
					$scope.sortOrder = 'VOTES COUNTED';
					break;
				case 'favorites_count':
					$scope.sortOrder = 'FAVORITES COUNT';
					break;
			}
		}
		
		var search = function(page) {
			$rootScope.menuOption = 'grid';
			if($routeParams.sortOrder != 'do_nothing'){
				setSortOrder();
				$http.get("https://api.500px.com/v1/photos?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&feature=user&username="
						+$rootScope.globals.currentUser.username+"&sort="+$routeParams.sortOrder+"&rpp=100&page="+page+"&image_size="+3)
					.then(onPhotoComplete, onError);
			}
		};
		
		$scope.showDetails = function(photoid){
			$location.path("/myPhotoDetails/" + photoid);
		};
		
		search(1);
	}
	
	app.controller("MyPhotoGridController", ["$scope", "$http", "$log", "$location", "$rootScope", "$routeParams", MyPhotoGridController]);
	
}());
