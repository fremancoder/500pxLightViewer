(function (){
	
	var app = angular.module("my500pxViewer");
	
	var PopularGridController = function($scope, $http, $log, $location, $rootScope, $routeParams, $cookieStore) {
		
		
		$scope.isSort = function(sortorder){
			if($rootScope.sortOrder == sortorder) {
				return true;
			} else {
				return false;
			}
		}

		var onPhotoComplete = function(response){
			$scope.currentPage = response.data.current_page; 
			$scope.totalPages = response.data.total_pages; 
			$scope.myPhotos = response.data.photos;
			createGrid();
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
					$rootScope.sortOrder = 'CREATED AT';
					$rootScope.sortOrderParam = 'created_at';
					break;
				case 'times_viewed':
					$rootScope.sortOrder = 'TIMES VIEWED';
					$rootScope.sortOrderParam = 'times_viewed';
					break;
				case 'votes_count':
					$rootScope.sortOrder = 'VOTES COUNT';
					$rootScope.sortOrderParam = 'votes_count';
					break;
				case 'favorites_count':
					$rootScope.sortOrder = 'FAVORITES COUNT';
					$rootScope.sortOrderParam = 'favorites_count';
					break;
				case 'rating':
					$rootScope.sortOrder = 'CURRENT PULSE';
					$rootScope.sortOrderParam = 'rating';
					break;
			}
		}
		
		var setCategoryName= function(){
			switch($routeParams.categoryName){
				case 'people':
					$rootScope.categoryName = 'PEOPLE';
					break;
				case 'fashion':
					$rootScope.categoryName = 'FASHION';
					break;
				case 'nude':
					$rootScope.categoryName = 'NUDE';
					break;
				case 'landscapes':
					$rootScope.categoryName = 'LANDSCAPES';
					break;
				case 'nature':
					$rootScope.categoryName = 'NATURE';
					break;
				case 'blackandwhite':
					$rootScope.categoryName = 'BLACK AND WHITE';
					break;
				case 'abstract':
					$rootScope.categoryName = 'ABSTRACT';
					break;
				case 'all':
					$rootScope.categoryName = 'ALL';
					break;
			}
		}
		
		var initSelectionValues = function () {
			if($routeParams.categoryName){
				setCategoryName();
				if(!$rootScope.sortOrder){
					$rootScope.sortOrder = 'CURRENT PULSE';
					$rootScope.sortOrderParam = 'rating';
				}
			}
			if($routeParams.sortOrder){
				setSortOrder();
				if(!$rootScope.categoryName){
					$rootScope.categoryName = 'ALL';
				}
			}
		}

		var search = function(page) {
			$rootScope.menuOption = 'popular';
			initSelectionValues();
			if($scope.categoryName == 'ALL'){
				$http.get("https://api.500px.com/v1/photos?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&feature=popular&sort="
						+$rootScope.sortOrderParam+"&rpp=51&page="+page+"&image_size="+3)
					.then(onPhotoComplete, onError);
			} else {
				$http.get("https://api.500px.com/v1/photos?consumer_key=B6MTHGzi26N8UNo7EkX20z0UoWMJOkQSNX9vlnMa&feature=popular&sort="
						+$rootScope.sortOrderParam+"&rpp=51&page="+page+"&image_size="+3+"&only="+$rootScope.categoryName)
					.then(onPhotoComplete, onError);
			}
		};
		
		$scope.pageSwitch = function(page){
			search(page);
		}
		
		$scope.showDetails = function(photoid){
			$location.path("/myPhotoDetails/" + photoid);
		};
		
		search(1);
	}
	
	app.controller("PopularGridController", ["$scope", "$http", "$log", "$location", "$rootScope", "$routeParams", "$cookieStore", PopularGridController]);
	
}());
